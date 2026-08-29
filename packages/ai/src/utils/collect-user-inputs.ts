import type * as readline from "node:readline/promises";
import { categories, db } from "@epoch-labs/db";
import { eq } from "drizzle-orm";

export interface UserInputs {
	name: string;
	brand: string;
	categoryId: string;
	notes: string;
}

export async function collectUserInputs(rl: readline.Interface): Promise<UserInputs> {
	const answerName = await rl.question("Product name: ");
	const name = answerName.trim();
	if (!name) {
		throw new Error("Product name is required.");
	}

	const answerBrand = await rl.question("Brand name: ");
	const brand = answerBrand.trim();
	if (!brand) {
		throw new Error("Brand name is required.");
	}

	const leafCategories = await db
		.select({ id: categories.id, name: categories.name, path: categories.path })
		.from(categories)
		.where(eq(categories.isLeaf, true))
		.orderBy(categories.path);

	if (leafCategories.length === 0) {
		throw new Error("No leaf categories found in the database. Seed categories first.");
	}

	console.log("\nAvailable categories:");
	for (const cat of leafCategories) {
		console.log(`  • ${cat.name} (${cat.path})`);
	}

	const answerCategoryName = await rl.question("\nSelect category by name: ");
	const categoryName = answerCategoryName.trim();
	const categoryId = leafCategories.find((cat) => cat.name.toLowerCase() === categoryName.toLowerCase())?.id;
	if (!categoryId) {
		throw new Error(`Category "${categoryName}" not found.`);
	}

	const answerNotes = await rl.question(
		"\nProvide notes for AI (e.g. key ingredients, target skin type, price range): ",
	);
	const notes = answerNotes.trim();
	if (!notes) {
		throw new Error("Notes are required to guide AI generation. Please provide context about the product.");
	}

	return { name, brand, categoryId, notes };
}
