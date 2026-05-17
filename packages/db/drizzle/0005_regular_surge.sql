ALTER TABLE "categories" ALTER COLUMN "embedding" SET DATA TYPE vector(1536);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "embedding" SET DATA TYPE vector(1536);