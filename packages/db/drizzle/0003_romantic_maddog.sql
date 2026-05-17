ALTER TABLE "categories" ADD COLUMN "embedding" vector(1536);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "embedding" vector(1536);--> statement-breakpoint
CREATE INDEX "categories_embedding_idx" ON "categories" USING hnsw ("embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX "products_embedding_idx" ON "products" USING hnsw ("embedding" vector_cosine_ops);