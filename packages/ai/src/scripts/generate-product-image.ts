import { geminiImage } from "@ai/lib/gemini";
import { buildProductImagePrompt } from "@ai/utils/build-product-image-prompt";
import { db, type ProductImage, products } from "@epoch-labs/db";
import { generateImage } from "ai";
import { eq } from "drizzle-orm";

export async function generateProductImage(productId: string) {
	const rows = await db.select().from(products).where(eq(products.id, productId));
	const product = rows.at(0);

	if (!product) {
		throw new Error(`Product with ID ${productId} not found.`);
	}

	const prompt = buildProductImagePrompt(product);

	const { image } = await generateImage({
		model: geminiImage,
		prompt,
		aspectRatio: "1:1",
	});

	const productImage: ProductImage = {
		url: `data:image/png;base64,${image.base64}`,
		alt: product.name,
		isPrimary: true,
		displayOrder: 0,
	};

	await db
		.update(products)
		.set({ images: [productImage] })
		.where(eq(products.id, productId));
}

const productId = process.argv[2];
if (!productId) {
	console.error("Usage: generate:product-image <productId>");
	process.exit(1);
}

generateProductImage(productId)
	.then(() => {
		console.log(`Image generated and saved for product ${productId}`);
		process.exit(0);
	})
	.catch((err) => {
		console.error(`Error generating product image: ${err.message}`);
		process.exit(1);
	});
