import { geminiEmbedding } from "@ai/lib/gemini";
import { db, products } from "@epoch-labs/db";
import { embed, tool } from "ai";
import { and, eq, gte, ilike, isNotNull, lte, sql } from "drizzle-orm";
import z from "zod";

export const searchProductsTool = tool({
	description:
		"Search the product catalog using natural language. Returns the most semantically relevant active products, including an `agentSummary` field for text responses and `averageRating`/`reviewCount` for quality signals. Use optional filters to narrow by price, brand, or category.",
	inputSchema: z.object({
		query: z.string().describe("Natural language search query (e.g. 'gentle face wash for dry skin')"),
		limit: z.number().int().min(1).max(20).default(8).optional().describe("Max results to return"),
		priceMinCents: z.number().int().positive().optional().describe("Minimum price in cents (inclusive)"),
		priceMaxCents: z.number().int().positive().optional().describe("Maximum price in cents (inclusive)"),
		brand: z.string().optional().describe("Brand name filter (case-insensitive)"),
		categoryId: z.string().optional().describe("Restrict results to this category ID"),
	}),
	execute: async ({ query, limit, priceMinCents, priceMaxCents, brand, categoryId }) => {
		const { embedding } = await embed({
			model: geminiEmbedding,
			value: query,
			providerOptions: {
				google: { taskType: "RETRIEVAL_QUERY", outputDimensionality: 1536 },
			},
		});

		const vectorLiteral = `[${embedding.join(",")}]`;

		const rows = await db
			.select({
				id: products.id,
				name: products.name,
				slug: products.slug,
				brand: products.brand,
				shortDescription: products.shortDescription,
				agentSummary: products.agentSummary,
				lowestPriceInCents: products.lowestPriceInCents,
				currency: products.currency,
				averageRating: products.averageRating,
				reviewCount: products.reviewCount,
			})
			.from(products)
			.where(
				and(
					eq(products.status, "active"),
					eq(products.isIndexed, true),
					isNotNull(products.embedding),
					priceMinCents !== undefined ? gte(products.lowestPriceInCents, priceMinCents) : undefined,
					priceMaxCents !== undefined ? lte(products.lowestPriceInCents, priceMaxCents) : undefined,
					brand ? ilike(products.brand, brand) : undefined,
					categoryId ? eq(products.categoryId, categoryId) : undefined,
				),
			)
			.orderBy(sql`${products.embedding} <=> ${vectorLiteral}::vector`)
			.limit(limit ?? 8);

		return rows;
	},
});
