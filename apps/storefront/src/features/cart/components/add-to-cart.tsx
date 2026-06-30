import { Button, type ButtonProps } from "@/components/button";
import type { Product } from "@/features/products/schemas/product-schema";
import type { ProductVariant } from "@/features/products/schemas/product-variant-schema";

interface AddToCartProps extends Omit<ButtonProps, "children" | "variant"> {
	product: Product;
	variant: ProductVariant | null;
	buttonVariant?: ButtonProps["variant"];
}

export function AddToCart({ product, variant, buttonVariant, disabled, ...props }: AddToCartProps): React.ReactNode {
	const isAvailable = variant?.isAvailable ?? false;

	return (
		<Button size="xl" className="w-full" disabled={disabled || !isAvailable} variant={buttonVariant} {...props}>
			{isAvailable ? "Add to Cart" : "Out of Stock"}
		</Button>
	);
}
