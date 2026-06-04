import { categories, db, products } from "@epoch-labs/db";
import { and, eq } from "drizzle-orm";

export async function listCategories() {
	return db.select().from(categories);
}

export async function getCategoryByPath(path: string) {
	const [row] = await db
		.select()
		.from(categories)
		.where(eq(categories.path, path))
		.limit(1);
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
		.where(
			and(eq(categories.parentId, parentId), eq(categories.isActive, true)),
		)
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
		.where(
			and(
				eq(products.categoryId, categoryId),
				eq(products.status, "active"),
				eq(products.isIndexed, true),
			),
		)
		.orderBy(products.position);
}
