import { randomUUID } from "node:crypto";
import {
	cartItems,
	carts,
	db,
	orderItems,
	orders,
	products,
	productVariants,
	type ShippingAddress,
} from "@epoch-labs/db";
import { and, eq } from "drizzle-orm";

export async function getOrderById(id: string) {
	const [order] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
	return order ?? null;
}

export async function convertCartToOrder(sessionId: string, shippingAddress?: ShippingAddress, currency = "USD") {
	const [cart] = await db
		.select()
		.from(carts)
		.where(and(eq(carts.sessionId, sessionId), eq(carts.status, "active")))
		.limit(1);

	if (!cart) {
		return { cart: null, order: null };
	}

	const items = await db
		.select({
			productVariantId: cartItems.productVariantId,
			quantity: cartItems.quantity,
			priceSnapshot: cartItems.priceSnapshot,
			variantSku: productVariants.sku,
			variantName: productVariants.name,
			productName: products.name,
			productBrand: products.brand,
			productImages: products.images,
		})
		.from(cartItems)
		.innerJoin(productVariants, eq(cartItems.productVariantId, productVariants.id))
		.innerJoin(products, eq(productVariants.productId, products.id))
		.where(eq(cartItems.cartId, cart.id));

	if (items.length === 0) {
		return { cart, order: null, error: "empty_cart" as const };
	}

	const totalInCents = items.reduce((sum, item) => sum + item.priceSnapshot * item.quantity, 0);
	const orderId = randomUUID();

	const order = await db.transaction(async (tx) => {
		const [newOrder] = await tx
			.insert(orders)
			.values({
				id: orderId,
				cartId: cart.id,
				userId: cart.userId,
				totalInCents,
				currency,
				shippingAddress: shippingAddress ?? null,
			})
			.returning();

		await tx.insert(orderItems).values(
			items.map((item) => ({
				id: randomUUID(),
				orderId,
				productVariantId: item.productVariantId,
				quantity: item.quantity,
				priceInCents: item.priceSnapshot,
				variantSnapshot: {
					sku: item.variantSku,
					name: item.variantName,
					productName: item.productName,
					brand: item.productBrand,
					imageUrl: item.productImages.find((img) => img.isPrimary)?.url,
				},
			})),
		);
		await tx.update(carts).set({ status: "converted", updatedAt: new Date() }).where(eq(carts.id, cart.id));

		return newOrder;
	});

	return { cart, order };
}
