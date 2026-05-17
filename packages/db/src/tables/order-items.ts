import { index, integer, jsonb, pgTable, text } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { productVariants } from "./product-variants";

/**
 * Point-in-time snapshot of a variant and its parent product,
 * captured at the moment of purchase.
 * Ensures order history remains accurate even after catalog edits.
 */
export type VariantSnapshot = {
	/**
	 * The specific SKU (size / variant) the customer selected.
	 */
	sku: string;

	/**
	 * Variant label shown in size selectors (e.g. "50ml").
	 */
	name: string;

	/**
	 * Product name at purchase time, copied from the parent product for easy access.
	 */
	productName: string;

	/**
	 * Brand name at purchase time, copied from the parent product for easy access.
	 */
	brand: string;

	/**
	 * Primary image URL at purchase time.
	 */
	imageUrl?: string;
};

/**
 * A single line item in a confirmed order.
 * Prices and variant details are snapshotted so historical orders are
 * unaffected by future catalog changes or variant deletions.
 */
export const orderItems = pgTable(
	"order_items",
	{
		id: text("id").primaryKey(),

		/**
		 * The order this item belongs to.
		 * Deleted when the order is deleted.
		 */
		orderId: text("order_id")
			.notNull()
			.references(() => orders.id, { onDelete: "cascade" }),

		/**
		 * The SKU purchased.
		 * Restricted: the variant record is retained for order history.
		 */
		productVariantId: text("product_variant_id")
			.notNull()
			.references(() => productVariants.id, { onDelete: "restrict" }),

		/**
		 * Number of units purchased.
		 */
		quantity: integer("quantity").notNull(),

		/**
		 * Price per unit at the time the order was placed, in the smallest currency unit.
		 */
		priceInCents: integer("price_in_cents").notNull(),

		/**
		 * Snapshot of variant and product details at purchase time.
		 * Preserved so order confirmations and history remain accurate
		 * even after catalog edits or variant archival.
		 */
		variantSnapshot: jsonb("variant_snapshot")
			.$type<VariantSnapshot>()
			.notNull(),
	},

	(t) => [
		/**
		 * Fetch all line items for an order.
		 */
		index("order_items_order_id_idx").on(t.orderId),
	],
);

export type OrderItem = typeof orderItems.$inferSelect;
export type OrderItemDraft = typeof orderItems.$inferInsert;
