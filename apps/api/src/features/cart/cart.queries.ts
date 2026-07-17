import { randomUUID } from "node:crypto";
import { cartItems, carts, db, products, productVariants } from "@epoch-labs/db";
import { and, eq, inArray, sql } from "drizzle-orm";

type CartQuantityUpdate = "accumulate" | "replace";

interface CartItem {
	variantId: string;
	quantity: number;
}

interface CartItemInsert {
	id: string;
	cartId: string;
	productVariantId: string;
	quantity: number;
	priceSnapshot: number;
}

type VariantPriceMap = Map<string, number>;

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

async function deleteCartItems(tx: Tx, cartId: string, variantIds: string[]) {
	if (variantIds.length === 0) {
		return;
	}

	await tx.delete(cartItems).where(and(eq(cartItems.cartId, cartId), inArray(cartItems.productVariantId, variantIds)));
}

async function upsertCartItems(tx: Tx, values: CartItemInsert[], mode: CartQuantityUpdate) {
	if (values.length === 0) {
		return;
	}

	await tx
		.insert(cartItems)
		.values(values)
		.onConflictDoUpdate({
			target: [cartItems.cartId, cartItems.productVariantId],
			set: {
				quantity: mode === "accumulate" ? sql`${cartItems.quantity} + excluded.quantity` : sql`excluded.quantity`,
			},
		});
}

export async function createCart(sessionId: string, userId?: string) {
	const [existing] = await db
		.select()
		.from(carts)
		.where(and(eq(carts.sessionId, sessionId), eq(carts.status, "active")))
		.limit(1);

	if (existing) {
		return existing;
	}

	const [cart] = await db
		.insert(carts)
		.values({
			id: randomUUID(),
			sessionId,
			userId: userId ?? null,
		})
		.returning();

	return cart;
}

export async function getCartBySessionId(sessionId: string) {
	const [cart] = await db
		.select()
		.from(carts)
		.where(and(eq(carts.sessionId, sessionId), eq(carts.status, "active")))
		.limit(1);

	if (!cart) {
		return null;
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
				priceInCents: productVariants.priceInCents,
				isAvailable: productVariants.isAvailable,
			},
			product: {
				id: products.id,
				name: products.name,
				brand: products.brand,
				slug: products.slug,
				images: products.images,
			},
		})
		.from(cartItems)
		.innerJoin(productVariants, eq(cartItems.productVariantId, productVariants.id))
		.innerJoin(products, eq(productVariants.productId, products.id))
		.where(eq(cartItems.cartId, cart.id));

	return { ...cart, items };
}

async function fetchVariantPrices(variantIds: string[]): Promise<VariantPriceMap> {
	if (variantIds.length === 0) {
		return new Map();
	}

	const rows = await db
		.select({
			id: productVariants.id,
			priceInCents: productVariants.priceInCents,
		})
		.from(productVariants)
		.where(inArray(productVariants.id, variantIds));

	return new Map(rows.map((r) => [r.id, r.priceInCents]));
}

export async function patchCartItems(cartId: string, items: CartItem[], mode: CartQuantityUpdate = "replace") {
	const itemIdsToDelete = items.filter((i) => i.quantity <= 0).map((i) => i.variantId);
	const itemsToUpsert = items.filter((i) => i.quantity > 0);

	const priceMap = await fetchVariantPrices(itemsToUpsert.map((i) => i.variantId));

	const upsertValues = itemsToUpsert
		.filter((i) => priceMap.has(i.variantId))
		.map((i) => ({
			id: randomUUID(),
			cartId,
			productVariantId: i.variantId,
			quantity: i.quantity,
			priceSnapshot: priceMap.get(i.variantId) ?? 0,
		}));

	await db.transaction(async (tx) => {
		await deleteCartItems(tx, cartId, itemIdsToDelete);
		await upsertCartItems(tx, upsertValues, mode);
		await tx.update(carts).set({ updatedAt: new Date() }).where(eq(carts.id, cartId));
	});
}
