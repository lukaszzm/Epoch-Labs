import { products } from "@db/tables/products";
import {
	boolean,
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * A single purchasable SKU of a product.
 *
 * Cosmetics products commonly differ by size (30ml / 50ml / 100ml).
 * Each variant has its own price and stock level,
 * row denormalizes `lowestPriceInCents` for fast agent filtering.
 */
export const productVariants = pgTable(
	"product_variants",
	{
		id: text("id").primaryKey(),

		/**
		 * Parent product, variants are deleted when the product is deleted.
		 */
		productId: text("product_id")
			.notNull()
			.references(() => products.id, { onDelete: "cascade" }),

		/**
		 * Stock Keeping Unit - globally unique.
		 * Convention: "<BRAND>-<PRODUCT_CODE>-<SIZE>" (e.g. "LRP-TOL400-400ML").
		 */
		sku: text("sku").notNull(),

		/**
		 * Human-readable variant label shown in size selectors.
		 * e.g. "30ml", "50ml", "100ml Travel Size".
		 */
		name: text("name").notNull(),

		/**
		 * Selling price in the smallest currency unit (pence / cents).
		 * e.g. 14.50 USD → 1450.
		 */
		priceInCents: integer("price_in_cents").notNull(),

		/**
		 * Original price used to display a strike-through discount.
		 * Null when the product is not on sale!
		 */
		compareAtPriceInCents: integer("compare_at_price_in_cents"),

		/**
		 * Units currently in stock.
		 */
		stockQuantity: integer("stock_quantity").notNull().default(0),

		/**
		 * Master availability flag.
		 * False when out of stock or manually disabled.
		 * The agent only surfaces variants where isAvailable = true.
		 */
		isAvailable: boolean("is_available").notNull().default(true),

		/**
		 * Display order within the parent product's size selector. Lower = first.
		 */
		position: integer("position").notNull().default(0),

		/**
		 * Timestamp of variant creation. Immutable. Used for sorting and agent context.
		 */
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),

		/**
		 * Timestamp of last update to any variant field. Used for cache invalidation and agent context.
		 */
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},

	(t) => [
		/**
		 * SKUs must be globally unique across the entire catalog.
		 */
		uniqueIndex("product_variants_sku_idx").on(t.sku),

		/**
		 * Fetch all variants for a product.
		 */
		index("product_variants_product_id_idx").on(t.productId),

		/**
		 * Agent: only surface available variants for a product.
		 */
		index("product_variants_product_available_idx").on(
			t.productId,
			t.isAvailable,
		),

		/**
		 * Ordered size selector rendering.
		 */
		index("product_variants_product_position_idx").on(t.productId, t.position),
	],
);

export type ProductVariant = typeof productVariants.$inferSelect;
export type ProductVariantDraft = typeof productVariants.$inferInsert;
