/** biome-ignore-all lint/suspicious/noExplicitAny: <can be used when defining types for database schema> */

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
} from "drizzle-orm/pg-core";

/**
 * Hints consumed by the agent to navigate and route queries correctly.
 * All fields should be kept accurate and concise — the agent uses these
 * directly at inference time.
 */
export type AgentHints = {
	/**
	 * Natural language aliases users might say (e.g. "daily SPF cream", "BB cream")
	 */
	synonyms: string[];

	/**
	 *  Purchase/search intents this category satisfies (e.g. "hydration", "sun protection")
	 */
	intents: string[];

	/**
	 * IDs (not slugs/names) of categories that pair well with this one.
	 * Used for cross-sell recommendations (e.g. "This also goes well with 'X'")
	 */
	complementaryCategories: string[];

	/**
	 * Months or seasons where demand peaks. Use full names: "january", "summer", etc.
	 */
	seasonality?: string[];

	/**
	 * Audience descriptors (e.g. "oily skin", "mature skin", "men", "teens")
	 */
	targetAudience?: string[];

	/**
	 * Terms that sound related but belong elsewhere. Prevents mis-routing.
	 * e.g. "toner" on a category for printer toner exclusion would be on the
	 * Skincare Toners category to exclude "printer".
	 */
	excludeTerms?: string[];

	/**
	 * Concrete scenarios where products in this category are used.
	 * Helps the agent answer "what do I need for X?" queries.
	 * e.g. ["morning routine", "travel kit", "gifting"]
	 */
	typicalUseCases?: string[];

	/**
	 * 0–1 score. If the agent's routing confidence is below this value,
	 * it should ask a clarifying question before committing to this category.
	 * Recommended: 0.6–0.8 for ambiguous categories.
	 */
	agentConfidenceThreshold?: number;
};

/**
 * A single filterable/searchable attribute defined at the category level.
 * Products in this category must (if required=true) or may (if required=false)
 * carry this attribute in their own attribute map.
 */
export type CategoryAttribute = {
	/**
	 * Machine key, snake_case. Must be stable — used by agent filter queries.
	 */
	key: string;

	/**
	 * Human-readable label shown in UI and passed to the agent.
	 */
	label: string;

	/**
	 * Data shape for validation and rendering.
	 */
	type: "enum" | "range" | "boolean" | "multi-enum" | "text";

	/**
	 * Valid discrete values for enum / multi-enum types.
	 */
	options?: string[];

	/**
	 * Physical unit for range types (e.g. "ml", "SPF", "g").
	 */
	unit?: string;

	/**
	 * If true, the agent may use this attribute in WHERE / filter clauses.
	 * Keep false for purely decorative attributes (e.g. "hero ingredient story").
	 */
	filterable: boolean;

	/**
	 * If true, the attribute value is included in the product's semantic index.
	 * Enables vector-based filtering ("something moisturising with niacinamide").
	 */
	searchable: boolean;

	/**
	 * If true, every product in this category MUST declare this attribute.
	 * The catalog ingest pipeline should reject products missing required attributes.
	 */
	required: boolean;

	/**
	 * Controls display order in filter panels and agent-generated summaries.
	 */
	displayOrder: number;
};

export type BreadcrumbItem = {
	/**
	 * The unique identifier of the category, not the slug or name.
	 */
	id: string;

	/**
	 * Human-readable name of the category at this level of the breadcrumb.
	 */
	name: string;

	/**
	 * URL-safe slug of the category, used for constructing paths and URLs but not as a unique identifier.
	 */
	slug: string;

	/**
	 * Zero-based depth level of this node in the tree.
	 */
	level: number;
};

export const categories = pgTable(
	"categories",
	{
		id: text("id").primaryKey(),

		parentId: text("parent_id").references((): any => categories.id, {
			onDelete: "restrict",
		}),

		/**
		 * Human-readable category name (e.g. "Moisturisers", "Shampoos", "Aftershaves").
		 */
		name: text("name").notNull(),

		/**
		 * URL-safe identifier (e.g. "moisturisers", "shampoos", "aftershaves").
		 */
		slug: text("slug").notNull(),

		/**
		 * Materialized Unix-style path for efficient subtree queries.
		 * Format: "/parent-slug/child-slug/this-slug"
		 * Query pattern: WHERE path LIKE '/skincare/%'
		 * Must be kept in sync with slug and parentId on every write.
		 */
		path: text("path").notNull().default(""),

		/**
		 * Detailed category description used for SEO and as source material for agent summarization.
		 */
		description: text("description").notNull().default(""),

		/**
		 * Depth level in the category tree, root = 0. Used for agent navigation and UI rendering.
		 */
		level: integer("level").notNull().default(0),

		/**
		 * Display order among siblings. Lower = earlier.
		 */
		position: integer("position").notNull().default(0),

		/**
		 * Master switch — false means the category is fully disabled.
		 */
		isActive: boolean("is_active").notNull().default(true),

		/**
		 * Show this category in navigation menus and browse pages.
		 */
		isVisibleInNav: boolean("is_visible_in_nav").notNull().default(true),

		/**
		 * Allow the agent to route queries to this category.
		 * Set false to soft-launch a category (exists in DB, not agent-accessible yet).
		 */
		isIndexed: boolean("is_indexed").notNull().default(true),

		/**
		 * True when this category has no children.
		 * The agent switches from "navigate deeper" to "fetch products" mode
		 * when it lands on a leaf.
		 */
		isLeaf: boolean("is_leaf").notNull().default(false),

		/**
		 * Representative image for this category, used in agent responses and UI.
		 */
		imageUrl: text("image_url"),

		/**
		 * Optional secondary icon URL for this category, used in agent responses and UI when a more compact visual is needed (e.g. in breadcrumbs or filter tags).
		 */
		iconUrl: text("icon_url"),

		/**
		 * LLM-generated prose summary of the category for the agent context window.
		 * Synthesised from: name + description + agentHints.
		 */
		seoTitle: text("seo_title"),

		/**
		 * LLM-generated prose summary of the category for SEO purposes.
		 * Should be kept under 160 characters.
		 * Synthesised from: name + description + agentHints.
		 */
		seoDescription: text("seo_description"),

		/**
		 * Free-form tags for ad-hoc filtering and agent hints.
		 */
		tags: jsonb("tags").$type<string[]>().notNull().default([]),

		/**
		 * Rich hints for the routing agent.
		 * See AgentHints type for field-level documentation.
		 */
		agentHints: jsonb("agent_hints")
			.$type<AgentHints>()
			.notNull()
			.default({ synonyms: [], intents: [], complementaryCategories: [] }),

		/**
		 * Typed attribute definitions that govern product filtering in this category.
		 * See CategoryAttribute type for field-level documentation.
		 */
		attributes: jsonb("attributes")
			.$type<CategoryAttribute[]>()
			.notNull()
			.default([]),

		/**
		 * Denormalized breadcrumb trail, root → this category.
		 * Avoids recursive CTEs on every agent traversal.
		 * Must be kept in sync on every parent change.
		 */
		breadcrumb: jsonb("breadcrumb")
			.$type<BreadcrumbItem[]>()
			.notNull()
			.default([]),

		// TODO: Add a pgvector column for semantic category matching.
		/**
		 * 1 536-dimension OpenAI / pgvector embedding of:
		 *   name + description + agentHints.synonyms + agentHints.intents
		 * Enables semantic category matching from free-form natural language queries.
		 * Regenerate whenever name, description, or agentHints changes.
		 *
		 * Query pattern:
		 *   SELECT * FROM categories
		 *   ORDER BY embedding <=> $queryVector
		 *   LIMIT 5;
		 *
		 * Requires the pgvector extension:
		 *   CREATE EXTENSION IF NOT EXISTS vector;
		 *
		 * Column definition (add via raw SQL migration until Drizzle ships
		 * first-class pgvector support):
		 *   ALTER TABLE categories ADD COLUMN embedding vector(1536);
		 *
		 * Kept as text here as a typed placeholder; swap for the pgvector
		 * column type once your Drizzle version supports it.
		 */
		// embedding: vector("embedding", { dimensions: 1536 }),

		/**
		 * Timestamp of category creation. Immutable. Used for agent context and sorting.
		 */
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),

		/**
		 * Timestamp of last update to any category field.
		 */
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},

	(t) => [
		/**
		 * Slugs are unique within their parent, not globally.
		 * The materialized path is the globally unique identifier.
		 */
		uniqueIndex("categories_path_unique_idx").on(t.path),

		/**
		 * Slug must be unique within its parent scope.
		 */
		uniqueIndex("categories_parent_slug_idx").on(t.parentId, t.slug),

		/**
		 * Agent filters: only active + indexed categories
		 */
		index("categories_active_indexed_idx").on(t.isActive, t.isIndexed),

		/**
		 * Tree navigation: fetch children of a given parent
		 */
		index("categories_parent_id_idx").on(t.parentId),

		/**
		 *  Position-ordered listing within a parent
		 */
		index("categories_parent_position_idx").on(t.parentId, t.position),
	],
);

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
		currency: text("currency").notNull().default("GBP"),

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

		// TODO: Add a pgvector column for semantic product matching and filtering
		/**
		 * 1 536-dimension embedding of: name + brand + shortDescription + agentSummary
		 * + serialized attributes.
		 * Enables vector similarity search across the product catalog.
		 *
		 * Add via raw SQL migration (requires pgvector extension):
		 *   ALTER TABLE products ADD COLUMN embedding vector(1536);
		 */
		// embedding: vector("embedding", { dimensions: 1536 }),

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
	],
);

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

export type Category = typeof categories.$inferSelect;
export type CategoryDraft = typeof categories.$inferInsert;

export type Product = typeof products.$inferSelect;
export type ProductDraft = typeof products.$inferInsert;

export type ProductVariant = typeof productVariants.$inferSelect;
export type ProductVariantDraft = typeof productVariants.$inferInsert;
