import { randomUUID } from "node:crypto";
import { cartItems, carts, db, products, productVariants } from "@epoch-labs/db";
import { tool } from "ai";
import { and, eq, sql } from "drizzle-orm";
import z from "zod";

async function getOrCreateCart(sessionId: string) {
	const [existing] = await db
		.select()
		.from(carts)
		.where(and(eq(carts.sessionId, sessionId), eq(carts.status, "active")))
		.limit(1);

	if (existing) {
		return existing;
	}

	const [created] = await db.insert(carts).values({ id: randomUUID(), sessionId }).returning();

	return created;
}

export function buildAddToCartTool(sessionId: string) {
	return tool({
		description:
			"Add a product variant to the customer's cart. The quantity is added on top of any existing quantity for that variant. Use getProductDetail first to obtain the correct productVariantId.",
		inputSchema: z.object({
			productVariantId: z.string().describe("The variant ID to add (from getProductDetail)"),
			quantity: z.number().int().min(1).default(1).describe("Number of units to add"),
		}),
		execute: async ({ productVariantId, quantity }) => {
			const [variant] = await db
				.select({
					id: productVariants.id,
					priceInCents: productVariants.priceInCents,
					stockQuantity: productVariants.stockQuantity,
					isAvailable: productVariants.isAvailable,
					variantName: productVariants.name,
					sku: productVariants.sku,
					productName: products.name,
					currency: products.currency,
				})
				.from(productVariants)
				.innerJoin(products, eq(productVariants.productId, products.id))
				.where(eq(productVariants.id, productVariantId))
				.limit(1);

			if (!variant) {
				return { success: false, error: "Product variant not found." };
			}

			if (!variant.isAvailable) {
				return { success: false, error: "This variant is currently unavailable." };
			}

			if (variant.stockQuantity !== null && variant.stockQuantity <= 0) {
				return { success: false, error: "This variant is currently out of stock." };
			}

			const cart = await getOrCreateCart(sessionId);

			if (!cart) {
				return { success: false, error: "Failed to create or retrieve cart." };
			}

			await db
				.insert(cartItems)
				.values({
					id: randomUUID(),
					cartId: cart.id,
					productVariantId,
					quantity,
					priceSnapshot: variant.priceInCents,
				})
				.onConflictDoUpdate({
					target: [cartItems.cartId, cartItems.productVariantId],
					// Increment existing quantity rather than replace
					set: { quantity: sql`cart_items.quantity + ${quantity}` },
				});

			await db.update(carts).set({ updatedAt: new Date() }).where(eq(carts.id, cart.id));

			return {
				success: true,
				cartId: cart.id,
				added: {
					variantId: productVariantId,
					sku: variant.sku,
					variantName: variant.variantName,
					productName: variant.productName,
					quantity,
					priceInCents: variant.priceInCents,
					currency: variant.currency,
				},
			};
		},
	});
}
