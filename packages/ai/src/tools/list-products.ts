import type { ProductAttributeValues } from "@epoch-labs/db";
import { db, products } from "@epoch-labs/db";
import { tool } from "ai";
import { and, count, eq, gte, ilike, lte, sql } from "drizzle-orm";
import z from "zod";

export const listProductsTool = tool({
	description:
		"Browse the product catalog with structured filters. Use this for category browsing, brand pages, or attribute-based filtering. For free-form natural-language queries prefer searchProducts instead.",
	inputSchema: z.object({
		categoryId: z.string().optional().describe("Filter to a specific category (use searchCategories to find IDs)"),
		brand: z.string().optional().describe("Brand name filter (case-insensitive)"),
		priceMinCents: z.number().int().positive().optional().describe("Minimum price in cents (inclusive)"),
		priceMaxCents: z.number().int().positive().optional().describe("Maximum price in cents (inclusive)"),
		attributes: z
			.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]))
			.optional()
			.describe("Attribute key-value pairs to filter by (e.g. { spf: 50, skin_type: 'oily' })"),
		page: z.number().int().min(1).default(1).optional().describe("Page number (1-indexed)"),
		limit: z.number().int().min(1).max(40).default(12).optional().describe("Results per page"),
	}),
	execute: async ({ categoryId, brand, priceMinCents, priceMaxCents, attributes, page, limit }) => {
		const pageNum = page ?? 1;
		const pageSize = limit ?? 12;
		const offset = (pageNum - 1) * pageSize;

		const where = and(
			eq(products.status, "active"),
			eq(products.isIndexed, true),
			categoryId ? eq(products.categoryId, categoryId) : undefined,
			brand ? ilike(products.brand, brand) : undefined,
			priceMinCents !== undefined ? gte(products.lowestPriceInCents, priceMinCents) : undefined,
			priceMaxCents !== undefined ? lte(products.lowestPriceInCents, priceMaxCents) : undefined,
			attributes && Object.keys(attributes).length > 0
				? sql`${products.attributes} @> ${JSON.stringify(attributes as ProductAttributeValues)}::jsonb`
				: undefined,
		);

		const [rows, totals] = await Promise.all([
			db
				.select({
					id: products.id,
					categoryId: products.categoryId,
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
				.where(where)
				.orderBy(products.position)
				.limit(pageSize)
				.offset(offset),
			db.select({ total: count() }).from(products).where(where),
		]);

		const total = totals[0]?.total ?? 0;

		return {
			data: rows,
			pagination: {
				total,
				page: pageNum,
				limit: pageSize,
				totalPages: Math.ceil(total / pageSize),
			},
		};
	},
});
