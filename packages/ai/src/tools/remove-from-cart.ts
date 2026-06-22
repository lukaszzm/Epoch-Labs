import { cartItems, carts, db } from "@epoch-labs/db";
import { tool } from "ai";
import { and, eq, sql } from "drizzle-orm";
import z from "zod";

export function buildRemoveFromCartTool(sessionId: string) {
	return tool({
		description:
			"Remove a product variant from the cart, or reduce its quantity. If the resulting quantity would be zero or less, the item is deleted entirely.",
		inputSchema: z.object({
			productVariantId: z.string().describe("The variant ID to remove or reduce"),
			quantity: z
				.number()
				.int()
				.min(1)
				.optional()
				.describe("Units to remove. Omit (or pass the current quantity) to remove the item completely."),
		}),
		execute: async ({ productVariantId, quantity }) => {
			const [cart] = await db
				.select({ id: carts.id })
				.from(carts)
				.where(and(eq(carts.sessionId, sessionId), eq(carts.status, "active")))
				.limit(1);

			if (!cart) {
				return { success: false, error: "No active cart found for this session." };
			}

			const [existingItem] = await db
				.select({ id: cartItems.id, quantity: cartItems.quantity })
				.from(cartItems)
				.where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productVariantId, productVariantId)))
				.limit(1);

			if (!existingItem) {
				return { success: false, error: "Item not found in cart." };
			}

			const reduceBy = quantity ?? existingItem.quantity;
			const newQuantity = existingItem.quantity - reduceBy;

			if (newQuantity <= 0) {
				await db
					.delete(cartItems)
					.where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productVariantId, productVariantId)));

				await db.update(carts).set({ updatedAt: new Date() }).where(eq(carts.id, cart.id));

				return { success: true, action: "removed", productVariantId };
			}

			await db
				.update(cartItems)
				.set({ quantity: sql`${cartItems.quantity} - ${reduceBy}` })
				.where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productVariantId, productVariantId)));

			await db.update(carts).set({ updatedAt: new Date() }).where(eq(carts.id, cart.id));

			return { success: true, action: "reduced", productVariantId, newQuantity };
		},
	});
}
