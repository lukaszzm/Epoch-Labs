import { geminiEmbedding } from "@ai/lib/gemini";
import { buildProductText } from "@ai/utils/build-product-text";
import type { ProductAttributeValues } from "@epoch-labs/db";
import { embed } from "ai";

export interface ProductEmbeddingInput {
	name: string;
	brand: string;
	shortDescription: string;
	agentSummary: string;
	attributes: ProductAttributeValues;
}

export async function generateProductEmbedding(input: ProductEmbeddingInput): Promise<number[]> {
	const text = buildProductText(input);

	const { embedding } = await embed({
		model: geminiEmbedding,
		value: text,
		providerOptions: {
			google: { taskType: "RETRIEVAL_DOCUMENT", outputDimensionality: 1536 },
		},
	});

	return embedding;
}
