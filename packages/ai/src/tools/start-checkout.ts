import { randomUUID } from "node:crypto";
import type { VariantSnapshot } from "@epoch-labs/db";
import { cartItems, carts, db, orderItems, orders, products, productVariants } from "@epoch-labs/db";
import { tool } from "ai";
import { and, eq } from "drizzle-orm";
import z from "zod";

export function buildStartCheckoutTool(sessionId: string) {
	return tool({
		description:
			"Validate the customer's cart and create a pending order record. Returns an order summary with the total amount. The UI then collects shipping details and processes payment to confirm the order.",
		inputSchema: z.object({}),
		execute: async () => {
			const [cart] = await db
				.select()
				.from(carts)
				.where(and(eq(carts.sessionId, sessionId), eq(carts.status, "active")))
				.limit(1);

			if (!cart) {
				return { success: false, error: "No active cart found for this session." };
			}

			const items = await db
				.select({
					cartItemId: cartItems.id,
					productVariantId: cartItems.productVariantId,
					quantity: cartItems.quantity,
					priceSnapshot: cartItems.priceSnapshot,
					variant: {
						sku: productVariants.sku,
						name: productVariants.name,
						isAvailable: productVariants.isAvailable,
						stockQuantity: productVariants.stockQuantity,
					},
					product: {
						name: products.name,
						brand: products.brand,
						images: products.images,
						currency: products.currency,
					},
				})
				.from(cartItems)
				.innerJoin(productVariants, eq(cartItems.productVariantId, productVariants.id))
				.innerJoin(products, eq(productVariants.productId, products.id))
				.where(eq(cartItems.cartId, cart.id));

			if (items.length === 0) {
				return { success: false, error: "Cart is empty." };
			}

			const unavailable = items.filter((item) => !item.variant.isAvailable);
			if (unavailable.length > 0) {
				return {
					success: false,
					error: "Some cart items are no longer available.",
					unavailableVariantIds: unavailable.map((i) => i.productVariantId),
				};
			}

			const totalInCents = items.reduce((sum, item) => sum + item.priceSnapshot * item.quantity, 0);
			const currency = items[0]?.product.currency ?? "USD";

			const orderId = randomUUID();

			await db.transaction(async (tx) => {
				await tx.insert(orders).values({
					id: orderId,
					cartId: cart.id,
					userId: cart.userId,
					status: "pending",
					totalInCents,
					currency,
				});

				const orderItemValues = items.map((item) => {
					const primaryImage = (item.product.images as Array<{ url: string; isPrimary: boolean }>).find(
						(img) => img.isPrimary,
					);

					const snapshot: VariantSnapshot = {
						sku: item.variant.sku,
						name: item.variant.name,
						productName: item.product.name,
						brand: item.product.brand,
						imageUrl: primaryImage?.url,
					};

					return {
						id: randomUUID(),
						orderId,
						productVariantId: item.productVariantId,
						quantity: item.quantity,
						priceInCents: item.priceSnapshot,
						variantSnapshot: snapshot,
					};
				});

				await tx.insert(orderItems).values(orderItemValues);

				await tx.update(carts).set({ status: "converted", updatedAt: new Date() }).where(eq(carts.id, cart.id));
			});

			return {
				success: true,
				order: {
					id: orderId,
					status: "pending",
					totalInCents,
					currency,
					itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
					lineItems: items.map((item) => ({
						variantId: item.productVariantId,
						sku: item.variant.sku,
						variantName: item.variant.name,
						productName: item.product.name,
						brand: item.product.brand,
						quantity: item.quantity,
						priceInCents: item.priceSnapshot,
						lineTotalInCents: item.priceSnapshot * item.quantity,
					})),
				},
			};
		},
	});
}
