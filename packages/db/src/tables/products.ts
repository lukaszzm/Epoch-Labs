import {
	boolean,
	index,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	real,
	text,
	timestamp,
	uniqueIndex,
	vector,
} from "drizzle-orm/pg-core";
import { categories } from "./categories";

/**
 * Lifecycle state of a product.
 * - draft     — being authored, never shown to customers or the agent.
 * - active    — published and agent-accessible.
 * - archived  — soft-deleted, hidden from customers but retained for history.
 */
export const productStatus = pgEnum("product_status", [
	"draft",
	"active",
	"archived",
]);

export type ProductStatus = (typeof productStatus.enumValues)[number];

/**
 * A single image attached to a product.
 * `isPrimary` marks the hero image used in listings and agent responses.
 */
export type ProductImage = {
	url: string;
	alt: string;
	isPrimary: boolean;
	displayOrder: number;
};

/**
 * Actual attribute values for a product, keyed by the `key` field of the
 * parent category's `CategoryAttribute[]`.
 *
 * Value types map to `CategoryAttribute.type`:
 *   enum        → string
 *   multi-enum  → string[]
 *   range       → number
 *   boolean     → boolean
 *   text        → string
 *
 * The catalog ingest pipeline is responsible for validating these values
 * against the category's attribute definitions at write time.
 */
export type ProductAttributeValues = Record<
	string,
	string | number | boolean | string[]
>;

/**
 * A single product available for purchase, which may have multiple variants (SKUs).
 * The agent only surfaces products where `status = active` and `isIndexed = true`.
 * The agent uses `lowestPriceInCents` for price-based filtering without a JOIN on variants.
 */
export const products = pgTable(
	"products",
	{
		id: text("id").primaryKey(),

		/**
		 * The leaf category this product belongs to.
		 */
		categoryId: text("category_id")
			.notNull()
			.references(() => categories.id, { onDelete: "restrict" }),

		name: text("name").notNull(),

		/**
		 * URL-safe identifier, globally unique.
		 * Pattern: "<brand-slug>-<product-name-slug>" (e.g. "la-roche-posay-toleriane-hydrating-cleanser")
		 */
		slug: text("slug").notNull(),

		/**
		 * Brand / manufacturer name. Used for brand-filter queries by the agent.
		 */
		brand: text("brand").notNull(),

		/**
		 * 1–2 sentence summary shown in listing cards and agent short-form responses.
		 * Keep under 160 characters.
		 */
		shortDescription: text("short_description").notNull().default(""),

		/**
		 * Full product description (markdown or plain text).
		 * Used in PDP and as source material for agentSummary generation.
		 */
		description: text("description").notNull().default(""),

		/**
		 * Lifecycle state. Only `active` products are visible to customers and the agent.
		 */
		status: productStatus("status").notNull().default("draft"),

		/**
		 * Display order within the category. Lower = earlier.
		 */
		position: integer("position").notNull().default(0),

		/**
		 * Pin this product to featured slots (homepage, category hero, agent highlights).
		 */
		isFeatured: boolean("is_featured").notNull().default(false),

		/**
		 * Allow the agent to retrieve and recommend this product.
		 * Set false to soft-launch a product before it is agent-ready.
		 */
		isIndexed: boolean("is_indexed").notNull().default(true),

		/**
		 * List of product images with metadata. The agent uses the primary image in responses, the UI may use the full list for galleries and thumbnails.
		 */
		images: jsonb("images").$type<ProductImage[]>().notNull().default([]),

		/**
		 * Free-form tags for ad-hoc filtering and agent hints (e.g. ["bestseller", "new", "sensitive skin"]).
		 */
		tags: jsonb("tags").$type<string[]>().notNull().default([]),

		/**
		 * Actual attribute values for this product, keyed by the parent
		 * category's `CategoryAttribute.key`.
		 * See `ProductAttributeValues` for the value-type contract.
		 */
		attributes: jsonb("attributes")
			.$type<ProductAttributeValues>()
			.notNull()
			.default({}),

		/**
		 * Lowest price across all available variants, stored in the smallest
		 * currency unit (e.g. pence / cents).
		 * Null when the product has no active variants yet.
		 * Must be updated whenever a variant price or availability changes.
		 *
		 * Enables price-range queries without a variants JOIN:
		 *   WHERE lowest_price_in_cents <= 3000  -- "under 30 <currency>"
		 */
		lowestPriceInCents: integer("lowest_price_in_cents"),

		/**
		 * ISO 4217 currency code for all variants of this product (e.g. "USD", "PLN").
		 */
		currency: text("currency").notNull().default("USD"),

		/**
		 * LLM-generated prose summary of the product for the agent context window.
		 * Synthesised from: name + brand + description + attributes + category hints.
		 *
		 * Example:
		 *   "La Roche-Posay Toleriane Hydrating Gentle Cleanser is a fragrance-free,
		 *    cream-format face wash for dry and sensitive skin. Key ingredients:
		 *    niacinamide, ceramides. 400ml. 14.50 USD."
		 */
		agentSummary: text("agent_summary").notNull().default(""),

		/**
		 * 1 536-dimension Gemini embedding-001 vector (MRL-truncated from 3072).
		 * Encodes: name + brand + shortDescription + agentSummary + serialized attributes.
		 * Enables vector similarity search across the product catalog.
		 * Index with taskType: "RETRIEVAL_DOCUMENT"; query with taskType: "RETRIEVAL_QUERY".
		 * outputDimensionality: 1536 is used at embed time — stays within the
		 * pgvector HNSW 2000-dimension limit while preserving quality via MRL.
		 */
		embedding: vector("embedding", { dimensions: 1536 }),

		/**
		 * SEO title for this product, shown in agent responses and used as the title tag for SEO purposes. Keep under 60 characters.
		 */
		seoTitle: text("seo_title"),

		/**
		 * SEO description for this product, shown in agent responses and used as the meta description tag for SEO purposes. Keep under 160 characters.
		 */
		seoDescription: text("seo_description"),

		/**
		 * Mean star rating across all published reviews (0.0 – 5.0).
		 */
		averageRating: real("average_rating").notNull().default(0),

		/**
		 * Total number of published reviews.
		 */
		reviewCount: integer("review_count").notNull().default(0),

		/**
		 * Timestamp of product creation. Immutable. Used for agent context and sorting.
		 */
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),

		/**
		 * Timestamp of last update to any product field. Used for cache invalidation and agent context.
		 */
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},

	(t) => [
		/**
		 * Products are identified globally by slug (used in URLs).
		 */
		uniqueIndex("products_slug_idx").on(t.slug),

		/**
		 * Category browsing - all products in a category ordered for display.
		 */
		index("products_category_status_position_idx").on(
			t.categoryId,
			t.status,
			t.position,
		),

		/**
		 * Agent filter: only active + indexed products are agent-accessible.
		 */
		index("products_status_indexed_idx").on(t.status, t.isIndexed),

		/**
		 * Brand-level queries: "show me all La Roche-Posay moisturisers".
		 */
		index("products_brand_idx").on(t.brand),

		/**
		 * Price range queries without a variants join.
		 */
		index("products_price_idx").on(t.lowestPriceInCents),

		/**
		 * Featured product slots.
		 */
		index("products_featured_idx").on(t.isFeatured, t.status),

		/**
		 * Vector similarity index on the embedding column for semantic search and matching.
		 */
		index("products_embedding_idx").using(
			"hnsw",
			t.embedding.op("vector_cosine_ops"),
		),
	],
);

export type Product = typeof products.$inferSelect;
export type ProductDraft = typeof products.$inferInsert;
