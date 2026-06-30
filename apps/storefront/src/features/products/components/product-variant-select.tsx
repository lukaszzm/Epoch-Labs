import { ProductVariantSelectItem } from "@/features/products/components/product-variant-select-item";
import type { ProductVariant } from "@/features/products/schemas/product-variant-schema";

export interface ProductVariantSelectProps {
	selectedVariant: ProductVariant | null;
	variants: ProductVariant[];
	onSelect: (variant: ProductVariant) => void;
}

export function ProductVariantSelect({
	selectedVariant,
	variants,
	onSelect,
}: ProductVariantSelectProps): React.ReactNode {
	return (
		<div className="flex flex-wrap gap-2">
			{variants.map((variant) => {
				return (
					<ProductVariantSelectItem
						key={variant.id}
						variant={variant}
						isSelected={variant.id === selectedVariant?.id}
						onSelect={onSelect}
					/>
				);
			})}
		</div>
	);
}
