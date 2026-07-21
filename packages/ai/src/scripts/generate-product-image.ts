import { geminiImage } from "@ai/lib/gemini";
import { db, type Product, type ProductImage, products } from "@epoch-labs/db";
import { generateImage } from "ai";
import { eq } from "drizzle-orm";

interface ProductImagePromptOptions extends Pick<Product, "name" | "brand" | "shortDescription" | "agentSummary"> {}

function buildProductImagePrompt(product: ProductImagePromptOptions) {
	return `Generate a hyper-realistic, premium e-commerce product image for: ${product.name} by ${product.brand}. 
	Description: ${product.shortDescription}. 
	Agent Summary: ${product.agentSummary}. 
	Style Specifications: 
	- Background: Pure, seamless, bright white backdrop (infinity cove style) with no visible horizon line or wall corners.
	- Lighting: Soft, even, high-key studio lighting. Eliminate all harsh, directional shadows. The lighting should be bright and airy, with only soft, subtle contact shadows directly beneath the items to ground them on the surface.
	- Aesthetic: Minimalistic, clean, and modern. Avoid clutter, props, or distracting elements. Focus solely on the product.
	Composition and Details:
	- Focus: The main product must be perfectly centered, standing upright, front-facing, and in ultra-sharp macro focus. Ensure the product is fully visible and not cropped or cut off.
	- Styling: If needed incorporate 1 to 2 highly realistic, minimal props arranged elegantly around the base of the product to reflect its ingredients or texture. (For example: pristine water droplets, or perfect, fresh-cut slices of a botanical ingredient). Props should be subtle, not overpowering, and should enhance the product's appeal.
	- Clarity: The composition must remain mostly empty space (negative space) to draw the eye to the product. Any text on the packaging should be sharp, straight and legible.`
}

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
		aspectRatio: '1:1'
	})

	const base64Image = image.base64;
	const dataUri = `data:image/png;base64,${base64Image}`;

	const productImage: ProductImage = {
		url: dataUri,
		alt: product.name,
		isPrimary: true,
		displayOrder: 0,
	};

	await db.update(products).set({ images: [productImage] }).where(eq(products.id, productId));

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
		console.error(err);
		process.exit(1);
	});
