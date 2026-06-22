import { cartItems, carts, db, products, productVariants } from "@epoch-labs/db";
import { tool } from "ai";
import { and, eq } from "drizzle-orm";
import z from "zod";

export function buildGetCartTool(sessionId: string) {
	return tool({
		description:
			"Retrieve the customer's current cart with all line items, per-item prices, and a running total. Returns an empty cart when nothing has been added yet.",
		inputSchema: z.object({}),
		execute: async () => {
			const [cart] = await db
				.select()
				.from(carts)
				.where(and(eq(carts.sessionId, sessionId), eq(carts.status, "active")))
				.limit(1);

			if (!cart) {
				return { cartId: null, items: [], totalInCents: 0, currency: "USD", itemCount: 0 };
			}

			const items = await db
				.select({
					id: cartItems.id,
					productVariantId: cartItems.productVariantId,
					quantity: cartItems.quantity,
					priceSnapshot: cartItems.priceSnapshot,
					addedAt: cartItems.addedAt,
					variant: {
						sku: productVariants.sku,
						name: productVariants.name,
						isAvailable: productVariants.isAvailable,
					},
					product: {
						id: products.id,
						name: products.name,
						brand: products.brand,
						slug: products.slug,
						images: products.images,
						currency: products.currency,
					},
				})
				.from(cartItems)
				.innerJoin(productVariants, eq(cartItems.productVariantId, productVariants.id))
				.innerJoin(products, eq(productVariants.productId, products.id))
				.where(eq(cartItems.cartId, cart.id));

			const totalInCents = items.reduce((sum, item) => sum + item.priceSnapshot * item.quantity, 0);
			const currency = items[0]?.product.currency ?? "USD";

			return {
				cartId: cart.id,
				items: items.map((item) => ({
					...item,
					lineTotalInCents: item.priceSnapshot * item.quantity,
				})),
				totalInCents,
				currency,
				itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
			};
		},
	});
}
