import { Button } from "@/components/ui/button";
import type { ProductVariant } from "@/features/products/schemas/product-variant-schema";

export interface ProductVariantSelectItemProps {
	variant: ProductVariant;
	isSelected: boolean;
	onSelect: (variant: ProductVariant) => void;
}

export function ProductVariantSelectItem({
	variant,
	isSelected,
	onSelect,
}: ProductVariantSelectItemProps): React.ReactNode {
	return (
		<Button
			variant={isSelected ? "default" : "outline"}
			onClick={() => onSelect(variant)}
			disabled={!variant.isAvailable}
		>
			{variant.name}
		</Button>
	);
}
