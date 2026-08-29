import { type CategoryAttribute, categories, db } from "@epoch-labs/db";
import { eq } from "drizzle-orm";

export interface CategoryContext {
	name: string;
	description: string;
	attributes: CategoryAttribute[];
}

export async function fetchCategoryContext(categoryId: string): Promise<CategoryContext> {
	const rows = await db
		.select({
			name: categories.name,
			description: categories.description,
			attributes: categories.attributes,
		})
		.from(categories)
		.where(eq(categories.id, categoryId));

	const category = rows.at(0);
	if (!category) {
		throw new Error(`Category with ID ${categoryId} not found.`);
	}

	return category;
}
