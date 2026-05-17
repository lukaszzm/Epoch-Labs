/** biome-ignore-all lint/suspicious/noExplicitAny: <any is allowed for database table schemas> */
import {
	boolean,
	index,
	integer,
	jsonb,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	vector,
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

/**
 * A single category in the product taxonomy tree. Categories are used for agent routing and product filtering.
 * The tree structure is represented via parentId references and a materialized path for efficient subtree queries.
 * The agent only surfaces categories where `isActive = true` and `isIndexed = true`.
 */
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

		/**
		 * 1 536-dimension Gemini embedding-001 vector (MRL-truncated from 3072).
		 * Encodes: name + description + agentHints.synonyms + agentHints.intents.
		 * Enables semantic category routing from free-form natural language queries.
		 * Regenerate whenever name, description, or agentHints changes.
		 * Index with taskType: "RETRIEVAL_DOCUMENT"; query with taskType: "RETRIEVAL_QUERY".
		 * outputDimensionality: 1536 is used at embed time — stays within the
		 * pgvector HNSW 2000-dimension limit while preserving quality via MRL.
		 *
		 * Query pattern:
		 *   SELECT * FROM categories
		 *   ORDER BY embedding <=> $queryVector
		 *   LIMIT 5;
		 */
		embedding: vector("embedding", { dimensions: 1536 }),

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

		/**
		 * Semantic search index on the embedding column for agent routing.
		 */
		index("categories_embedding_idx").using(
			"hnsw",
			t.embedding.op("vector_cosine_ops"),
		),
	],
);

export type Category = typeof categories.$inferSelect;
export type CategoryDraft = typeof categories.$inferInsert;
