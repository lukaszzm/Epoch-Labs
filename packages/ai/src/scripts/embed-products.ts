import { geminiEmbedding } from "@ai/lib/gemini";
import { buildProductText } from "@ai/utils/build-product-text";
import { db, products } from "@epoch-labs/db";
import { embedMany } from "ai";
import { and, eq, isNull } from "drizzle-orm";

const BATCH_SIZE = 100;

export async function embedProducts(): Promise<{ updated: number }> {
	const rows = await db
		.select({
			id: products.id,
			name: products.name,
			brand: products.brand,
			shortDescription: products.shortDescription,
			agentSummary: products.agentSummary,
			attributes: products.attributes,
		})
		.from(products)
		.where(and(eq(products.isIndexed, true), isNull(products.embedding)));

	if (rows.length === 0) {
		console.warn("No products found that require embedding. Exiting...");
		return { updated: 0 };
	}

	console.log(`Embedding ${rows.length} products...`);

	let updated = 0;

	for (let i = 0; i < rows.length; i += BATCH_SIZE) {
		const batch = rows.slice(i, i + BATCH_SIZE);

		const { embeddings } = await embedMany({
			model: geminiEmbedding,
			values: batch.map(buildProductText),
			providerOptions: {
				google: { taskType: "RETRIEVAL_DOCUMENT", outputDimensionality: 1536 },
			},
		});

		await Promise.all(
			batch.map((row, idx) => db.update(products).set({ embedding: embeddings[idx] }).where(eq(products.id, row.id))),
		);

		updated += batch.length;
		console.log(`Embedded ${updated}/${rows.length} products`);
	}

	return { updated };
}

embedProducts()
	.then(({ updated }) => {
		if (updated === 0) {
			console.log("No products needed embedding.");
			process.exit(0);
		}

		console.log(`Done! Updated ${updated} products successfully.`);
		process.exit(0);
	})
	.catch((error) => {
		console.error(`Error embedding products: ${error.message}`);
		process.exit(1);
	});
