import {
	db,
	type ProductAttributeValues,
	products,
	productVariants,
} from "@epoch-labs/db";
import { and, count, eq, gte, ilike, lte, sql } from "drizzle-orm";

export type ProductFilters = {
	category?: string;
	brand?: string;
	priceMin?: number;
	priceMax?: number;
	attributes?: ProductAttributeValues;
	page: number;
	limit: number;
};

/**
 * Paginated list of active + indexed products with optional filters.
 */
export async function listProducts(filters: ProductFilters) {
	const { category, brand, priceMin, priceMax, attributes, page, limit } =
		filters;

	const where = and(
		eq(products.status, "active"),
		eq(products.isIndexed, true),
		category ? eq(products.categoryId, category) : undefined,
		brand ? ilike(products.brand, brand) : undefined,
		priceMin !== undefined
			? gte(products.lowestPriceInCents, priceMin)
			: undefined,
		priceMax !== undefined
			? lte(products.lowestPriceInCents, priceMax)
			: undefined,
		attributes && Object.keys(attributes).length > 0
			? sql`${products.attributes} @> ${JSON.stringify(attributes)}::jsonb`
			: undefined,
	);

	const offset = (page - 1) * limit;

	const [rows, totals] = await Promise.all([
		db
			.select({
				id: products.id,
				categoryId: products.categoryId,
				name: products.name,
				slug: products.slug,
				brand: products.brand,
				shortDescription: products.shortDescription,
				isFeatured: products.isFeatured,
				images: products.images,
				tags: products.tags,
				attributes: products.attributes,
				lowestPriceInCents: products.lowestPriceInCents,
				currency: products.currency,
				averageRating: products.averageRating,
				reviewCount: products.reviewCount,
				position: products.position,
				createdAt: products.createdAt,
			})
			.from(products)
			.where(where)
			.orderBy(products.position)
			.limit(limit)
			.offset(offset),
		db.select({ total: count() }).from(products).where(where),
	]);

	const total = totals.at(0)?.total ?? 0;

	return {
		data: rows,
		pagination: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}

/**
 * Full product detail by slug, including all variants.
 */
export async function getProductBySlug(slug: string) {
	const [product] = await db
		.select()
		.from(products)
		.where(eq(products.slug, slug))
		.limit(1);

	if (!product) return null;

	const variants = await db
		.select()
		.from(productVariants)
		.where(eq(productVariants.productId, product.id))
		.orderBy(productVariants.position);

	return { ...product, variants };
}
