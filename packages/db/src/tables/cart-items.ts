import { carts } from "@db/tables/carts";
import { productVariants } from "@db/tables/product-variants";
import {
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * A single line item in a shopping cart.
 * Prices are snapshotted at add-time so the cart total remains stable
 * even if the catalog price changes before the customer checks out.
 */
export const cartItems = pgTable(
	"cart_items",
	{
		id: text("id").primaryKey(),

		/**
		 * The cart this item belongs to.
		 * Deleted when the cart is deleted.
		 */
		cartId: text("cart_id")
			.notNull()
			.references(() => carts.id, { onDelete: "cascade" }),

		/**
		 * The specific SKU (size / variant) the customer selected.
		 * Restricted - a variant cannot be deleted while it is in an active cart.
		 */
		productVariantId: text("product_variant_id")
			.notNull()
			.references(() => productVariants.id, { onDelete: "restrict" }),

		/**
		 * Number of units. Always ≥ 1
		 */
		quantity: integer("quantity").notNull().default(1),

		/**
		 * Selling price per unit at the time this item was added, in the
		 * smallest currency unit (pence / cents).
		 * Copied from `productVariants.priceInCents` on insert.
		 * Kept stable so the cart total does not drift when the live price changes.
		 */
		priceSnapshot: integer("price_snapshot").notNull(),

		/**
		 * Timestamp when this item was added to the cart.
		 */
		addedAt: timestamp("added_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},

	(t) => [
		/**
		 * Each variant may appear at most once per cart.
		 * Use UPDATE quantity rather than inserting a duplicate row.
		 */
		uniqueIndex("cart_items_cart_variant_idx").on(
			t.cartId,
			t.productVariantId,
		),

		/**
		 * Fetch all items in a cart.
		 */
		index("cart_items_cart_id_idx").on(t.cartId),
	],
);

export type CartItem = typeof cartItems.$inferSelect;
export type CartItemDraft = typeof cartItems.$inferInsert;
