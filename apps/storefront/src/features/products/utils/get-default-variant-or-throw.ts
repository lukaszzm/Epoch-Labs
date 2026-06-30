import type { Product } from "@/features/products/schemas/product-schema";
import type { ProductVariant } from "@/features/products/schemas/product-variant-schema";

export function getDefaultVariantOrThrow(product: Product): ProductVariant {
	const availableVariants = product.variants.filter((v) => v.isAvailable);
	const availableVariant = availableVariants.at(0);

	if (availableVariant) {
		return availableVariant;
	}

	const firstVariant = product.variants.at(0);

	if (firstVariant) {
		return firstVariant;
	}

	throw new Error(`Product ${product.id} has no variants`);
}
