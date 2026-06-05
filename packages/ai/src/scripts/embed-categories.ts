import { BATCH_SIZE } from "@ai/config/constants";
import { embeddingModel } from "@ai/lib/gemini";
import { buildCategoryText } from "@ai/utils/build-category-text";
import { categories, db } from "@epoch-labs/db";
import { embedMany } from "ai";
import { and, eq, isNull } from "drizzle-orm";

export async function embedCategories(): Promise<{ updated: number }> {
	const rows = await db
		.select({
			id: categories.id,
			name: categories.name,
			description: categories.description,
			agentHints: categories.agentHints,
		})
		.from(categories)
		.where(and(eq(categories.isIndexed, true), isNull(categories.embedding)));

	if (rows.length === 0) {
		console.log("Categories: nothing to embed.");
		return { updated: 0 };
	}

	console.log(`Categories: embedding ${rows.length} rows…`);

	let updated = 0;

	for (let i = 0; i < rows.length; i += BATCH_SIZE) {
		const batch = rows.slice(i, i + BATCH_SIZE);

		const { embeddings } = await embedMany({
			model: embeddingModel,
			values: batch.map(buildCategoryText),
			providerOptions: {
				google: { taskType: "RETRIEVAL_DOCUMENT", outputDimensionality: 1536 },
			},
		});

		await Promise.all(
			batch.map((row, idx) =>
				db.update(categories).set({ embedding: embeddings[idx] }).where(eq(categories.id, row.id)),
			),
		);

		updated += batch.length;
		console.log(`Categories: ${updated}/${rows.length} embedded`);
	}

	return { updated };
}

embedCategories()
	.then(({ updated }) => {
		console.log(`Done! Updated ${updated} categories successfully.`);
		process.exit(0);
	})
	.catch((error) => {
		console.error("Error embedding categories:", error);
		process.exit(1);
	});
