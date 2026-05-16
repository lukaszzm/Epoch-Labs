// ------------------------------------------------------------------
// Supporting Types
// ------------------------------------------------------------------

import { boolean, index, integer, jsonb, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

 
/**
 * Hints consumed by the agent to navigate and route queries correctly.
 * All fields should be kept accurate and concise — the agent uses these
 * directly at inference time.
 */
export type AgentHints = {
  /** Natural language aliases users might say (e.g. "daily SPF cream", "BB cream") */
  synonyms: string[];
 
  /** Purchase/search intents this category satisfies (e.g. "hydration", "sun protection") */
  intents: string[];
 
  /**
   * IDs (not slugs/names) of categories that pair well with this one.
   * Used for cross-sell recommendations and "you might also need" flows.
   */
  complementaryCategories: string[];
 
  /** Months or seasons where demand peaks. Use full names: "january", "summer", etc. */
  seasonality?: string[];
 
  /** Audience descriptors (e.g. "oily skin", "mature skin", "men", "teens") */
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
  /** Machine key, snake_case. Must be stable — used by agent filter queries. */
  key: string;
 
  /** Human-readable label shown in UI and passed to the agent. */
  label: string;
 
  /** Data shape for validation and rendering. */
  type: "enum" | "range" | "boolean" | "multi-enum";
 
  /** Valid discrete values for enum / multi-enum types. */
  options?: string[];
 
  /** Physical unit for range types (e.g. "ml", "SPF", "g"). */
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
 
  /** Controls display order in filter panels and agent-generated summaries. */
  displayOrder: number;
};
 
export type BreadcrumbItem = {
  id: string;
  name: string;
  slug: string;
};
 
// ------------------------------------------------------------------
// Categories table
// ------------------------------------------------------------------
 
export const categories = pgTable(
  "categories",
  {
    id: text("id").primaryKey(),
 
    parentId: text("parent_id").references((): any => categories.id, {
      onDelete: "restrict",
    }),
 
    name: text("name").notNull(),
    slug: text("slug").notNull(),
 
    /**
     * Materialized Unix-style path for efficient subtree queries.
     * Format: "/parent-slug/child-slug/this-slug"
     * Query pattern: WHERE path LIKE '/skincare/%'
     * Must be kept in sync with slug and parentId on every write.
     */
    path: text("path").notNull().default(""),
 
    description: text("description").notNull().default(""),
    level: integer("level").notNull().default(0),
    position: integer("position").notNull().default(0),
 
    // ------------------------------------------------------------------
    // Visibility & lifecycle
    // ------------------------------------------------------------------
 
    /** Master switch — false means the category is fully disabled. */
    isActive: boolean("is_active").notNull().default(true),
 
    /** Show this category in navigation menus and browse pages. */
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
 
    // ------------------------------------------------------------------
    // Media
    // ------------------------------------------------------------------
 
    imageUrl: text("image_url"),
    iconUrl: text("icon_url"),
 
    // ------------------------------------------------------------------
    // SEO
    // ------------------------------------------------------------------
 
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
 
    // ------------------------------------------------------------------
    // Agent intelligence
    // ------------------------------------------------------------------
 
    tags: jsonb("tags").$type<string[]>().notNull().default([]),
 
    /**
     * Rich hints for the routing agent.
     * See AgentHints type for field-level documentation.
     */
    agentHints: jsonb("agent_hints").$type<AgentHints>().notNull(),
 
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
 
    // ------------------------------------------------------------------
    // Timestamps
    // ------------------------------------------------------------------
 
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
 
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
 
  // ------------------------------------------------------------------
  // Indexes
  // ------------------------------------------------------------------
 
  (t) => [
    uniqueIndex("categories_slug_idx").on(t.slug),
 
    /** Fast subtree queries: WHERE path LIKE '/skincare/%' */
    index("categories_path_idx").on(t.path),
 
    /** Agent filters: only active + indexed categories */
    index("categories_active_indexed_idx").on(t.isActive, t.isIndexed),
 
    /** Tree navigation: fetch children of a given parent */
    index("categories_parent_id_idx").on(t.parentId),
 
    /** Position-ordered listing within a parent */
    index("categories_parent_position_idx").on(t.parentId, t.position),
  ]
);
 
// ------------------------------------------------------------------
// Inferred types
// ------------------------------------------------------------------
 
export type Category = typeof categories.$inferSelect;
export type CategoryDraft = typeof categories.$inferInsert;
 