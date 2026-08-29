import "dotenv/config";

import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { askApproval } from "@ai/utils/ask-approval";
import { collectUserInputs } from "@ai/utils/collect-user-inputs";
import { fetchCategoryContext } from "@ai/utils/fetch-category-context";
import { generateProductContent } from "@ai/utils/generate-product-content";
import { generateProductEmbedding } from "@ai/utils/generate-product-embedding";
import { generateProductImageData } from "@ai/utils/generate-product-image-data";
import { persistProduct } from "@ai/utils/persist-product";
import { printProductPreview } from "@ai/utils/print-product-preview";

async function main(): Promise<void> {
	const rl = readline.createInterface({ input, output });

	try {
		console.log("Starting AI Product Creation Pipeline...");

		console.log("Answer a few questions and AI will generate the rest.\n");
		const inputs = await collectUserInputs(rl);

		console.log("Fetching category context...");
		const category = await fetchCategoryContext(inputs.categoryId);

		console.log("Generating product content...");
		const generated = await generateProductContent(inputs, category);

		console.log("Generating product image...");
		const image = await generateProductImageData(
			inputs.name,
			inputs.brand,
			generated.shortDescription,
			generated.agentSummary,
		);

		console.log("Generating product embedding...");
		const embedding = await generateProductEmbedding({
			name: inputs.name,
			brand: inputs.brand,
			shortDescription: generated.shortDescription,
			agentSummary: generated.agentSummary,
			attributes: generated.attributes,
		});

		console.log("Previewing product for approval...");
		printProductPreview(inputs, generated, image, category.name);
		const approved = await askApproval(rl);

		if (!approved) {
			console.log("User did not approve the product. Aborting...");
			process.exit(0);
		}

		console.log("Persisting product to database...");
		const { productId } = await persistProduct(inputs, generated, image, embedding);

		console.log("Product creation pipeline completed successfully!");
		console.log(`   ID:   ${productId}`);
		console.log(`   Slug: ${generated.slug}`);
		console.log("   The product is now active and visible in the storefront.\n");
	} finally {
		rl.close();
	}
}

main()
	.then(() => {
		process.exit(0);
	})
	.catch((err) => {
		console.error(`An error occurred during the product creation pipeline: ${err.message}`);
		process.exit(1);
	});
