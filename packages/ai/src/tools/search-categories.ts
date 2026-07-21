import { geminiEmbedding } from "@ai/lib/gemini";
import { categories, db } from "@epoch-labs/db";
import { embed, tool } from "ai";
import { and, eq, ilike, isNotNull, or, sql } from "drizzle-orm";
import z from "zod";

const SELECTED_FIELDS = {
	id: categories.id,
	name: categories.name,
	slug: categories.slug,
	path: categories.path,
	level: categories.level,
	isLeaf: categories.isLeaf,
	imageUrl: categories.imageUrl,
	breadcrumb: categories.breadcrumb,
	agentHints: categories.agentHints,
	description: categories.description,
};

export const searchCategoriesTool = tool({
	description:
		"Find product categories by semantic meaning or keyword. Returns relevant categories with breadcrumb trails and agent hints. Use the returned category IDs to filter subsequent listProducts or searchProducts calls.",
	inputSchema: z.object({
		query: z.string().describe("Natural language query (e.g. 'sun protection for face', 'anti-aging serum')"),
		limit: z.number().int().min(1).max(10).default(5).optional().describe("Max number of categories to return"),
	}),
	execute: async ({ query, limit }) => {
		const cap = limit ?? 5;

		// 1. Semantic vector search
		try {
			const { embedding } = await embed({
				model: geminiEmbedding,
				value: query,
				providerOptions: {
					google: { taskType: "RETRIEVAL_QUERY", outputDimensionality: 1536 },
				},
			});

			const vectorLiteral = `[${embedding.join(",")}]`;

			const rows = await db
				.select(SELECTED_FIELDS)
				.from(categories)
				.where(and(eq(categories.isActive, true), eq(categories.isIndexed, true), isNotNull(categories.embedding)))
				.orderBy(sql`${categories.embedding} <=> ${vectorLiteral}::vector`)
				.limit(cap);

			if (rows.length > 0) {
				return rows;
			}
		} catch {
			// fall through to keyword search
		}

		// 2. Keyword fallback
		const keyword = `%${query}%`;
		return db
			.select(SELECTED_FIELDS)
			.from(categories)
			.where(
				and(
					eq(categories.isActive, true),
					eq(categories.isIndexed, true),
					or(ilike(categories.name, keyword), ilike(categories.description, keyword)),
				),
			)
			.limit(cap);
	},
});
