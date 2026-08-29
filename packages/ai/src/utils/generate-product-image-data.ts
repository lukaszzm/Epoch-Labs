import { geminiImage } from "@ai/lib/gemini";
import { buildProductImagePrompt } from "@ai/utils/build-product-image-prompt";
import type { ProductImage } from "@epoch-labs/db";
import { generateImage } from "ai";

export async function generateProductImageData(
	name: string,
	brand: string,
	shortDescription: string,
	agentSummary: string,
): Promise<ProductImage> {
	const prompt = buildProductImagePrompt({ name, brand, shortDescription, agentSummary });

	const { image } = await generateImage({
		model: geminiImage,
		prompt,
		aspectRatio: "1:1",
	});

	return {
		url: `data:image/png;base64,${image.base64}`,
		alt: name,
		isPrimary: true,
		displayOrder: 0,
	};
}
