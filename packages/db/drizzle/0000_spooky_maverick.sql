CREATE TABLE "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"parent_id" text,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"path" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"level" integer DEFAULT 0 NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_visible_in_nav" boolean DEFAULT true NOT NULL,
	"is_indexed" boolean DEFAULT true NOT NULL,
	"is_leaf" boolean DEFAULT false NOT NULL,
	"image_url" text,
	"icon_url" text,
	"seo_title" text,
	"seo_description" text,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"agent_hints" jsonb DEFAULT '{"synonyms":[],"intents":[],"complementaryCategories":[]}'::jsonb NOT NULL,
	"attributes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"breadcrumb" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "categories_path_unique_idx" ON "categories" USING btree ("path");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_parent_slug_idx" ON "categories" USING btree ("parent_id","slug");--> statement-breakpoint
CREATE INDEX "categories_active_indexed_idx" ON "categories" USING btree ("is_active","is_indexed");--> statement-breakpoint
CREATE INDEX "categories_parent_id_idx" ON "categories" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "categories_parent_position_idx" ON "categories" USING btree ("parent_id","position");