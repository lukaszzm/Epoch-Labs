import { categories, db, products } from "@epoch-labs/db";
import { and, asc, count, desc, eq, inArray, like, or } from "drizzle-orm";
import type { CategoryPathQuery } from "@/features/categories/categories.schemas";

export async function listCategories() {
	return db.select().from(categories);
}

export async function getCategoryByPath(path: string) {
	const [row] = await db.select().from(categories).where(eq(categories.path, path)).limit(1);
	return row ?? null;
}

export async function getCategoryChildren(parentId: string) {
	return db
		.select({
			id: categories.id,
			parentId: categories.parentId,
			name: categories.name,
			slug: categories.slug,
			path: categories.path,
			level: categories.level,
			position: categories.position,
			isLeaf: categories.isLeaf,
			imageUrl: categories.imageUrl,
			iconUrl: categories.iconUrl,
		})
		.from(categories)
		.where(and(eq(categories.parentId, parentId), eq(categories.isActive, true)))
		.orderBy(categories.position);
}

export async function getCategoryProducts(categoryId: string) {
	return db
		.select({
			id: products.id,
			name: products.name,
			slug: products.slug,
			brand: products.brand,
			shortDescription: products.shortDescription,
			images: products.images,
			lowestPriceInCents: products.lowestPriceInCents,
			currency: products.currency,
			averageRating: products.averageRating,
			reviewCount: products.reviewCount,
			isFeatured: products.isFeatured,
			tags: products.tags,
			position: products.position,
		})
		.from(products)
		.where(and(eq(products.categoryId, categoryId), eq(products.status, "active"), eq(products.isIndexed, true)))
		.orderBy(products.position);
}

export async function getCategorySubtreeProducts(
	categoryPath: string,
	options: CategoryPathQuery = { sort: "featured", page: 1, limit: 20 },
) {
	const { sort, page, limit } = options;

	const subtreeIds = await db
		.select({ id: categories.id })
		.from(categories)
		.where(
			and(
				eq(categories.isActive, true),
				or(eq(categories.path, categoryPath), like(categories.path, `${categoryPath}/%`)),
			),
		);

	if (subtreeIds.length === 0) {
		return { products: [], total: 0 };
	}

	const ids = subtreeIds.map((c) => c.id);

	const baseWhere = and(inArray(products.categoryId, ids), eq(products.status, "active"), eq(products.isIndexed, true));

	const orderByClause =
		sort === "price_asc"
			? asc(products.lowestPriceInCents)
			: sort === "price_desc"
				? desc(products.lowestPriceInCents)
				: sort === "newest"
					? desc(products.createdAt)
					: sort === "rating_desc"
						? desc(products.averageRating)
						: asc(products.position);

	const offset = (page - 1) * limit;

	const [rows, [countRow]] = await Promise.all([
		db
			.select({
				id: products.id,
				name: products.name,
				slug: products.slug,
				brand: products.brand,
				shortDescription: products.shortDescription,
				images: products.images,
				lowestPriceInCents: products.lowestPriceInCents,
				currency: products.currency,
				averageRating: products.averageRating,
				reviewCount: products.reviewCount,
				isFeatured: products.isFeatured,
				tags: products.tags,
				position: products.position,
				createdAt: products.createdAt,
				updatedAt: products.updatedAt,
			})
			.from(products)
			.where(baseWhere)
			.orderBy(orderByClause)
			.limit(limit)
			.offset(offset),
		db.select({ total: count() }).from(products).where(baseWhere),
	]);

	return { products: rows, total: countRow?.total ?? 0 };
}
