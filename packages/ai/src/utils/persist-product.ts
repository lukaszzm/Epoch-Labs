import type { UserInputs } from "@ai/utils/collect-user-inputs";
import { generateId } from "@ai/utils/generate-id";
import type { GeneratedProduct } from "@ai/utils/generate-product-content";
import {
	db,
	type ProductDraft,
	type ProductImage,
	type ProductVariantDraft,
	products,
	productVariants,
} from "@epoch-labs/db";

export async function persistProduct(
	inputs: UserInputs,
	generated: GeneratedProduct,
	image: ProductImage,
	embedding: number[],
): Promise<{ productId: string }> {
	const productId = generateId("prod");
	const lowestPriceInCents = Math.min(...generated.variants.map((v) => v.priceInCents));

	const productDraft: ProductDraft = {
		id: productId,
		categoryId: inputs.categoryId,
		name: inputs.name,
		slug: generated.slug,
		brand: inputs.brand,
		shortDescription: generated.shortDescription,
		description: generated.description,
		status: "active",
		position: 0,
		isFeatured: generated.isFeatured,
		isIndexed: true,
		images: [image],
		tags: generated.tags,
		attributes: generated.attributes,
		lowestPriceInCents,
		currency: "USD",
		agentSummary: generated.agentSummary,
		seoTitle: generated.seoTitle,
		seoDescription: generated.seoDescription,
		embedding,
	};

	const variantDrafts: ProductVariantDraft[] = generated.variants.map((v, idx) => ({
		id: generateId("var"),
		productId,
		sku: v.sku,
		name: v.name,
		priceInCents: v.priceInCents,
		compareAtPriceInCents: v.compareAtPriceInCents ?? null,
		stockQuantity: v.stockQuantity,
		isAvailable: true,
		position: idx,
	}));

	await db.insert(products).values(productDraft);
	await db.insert(productVariants).values(variantDrafts);

	return { productId };
}
