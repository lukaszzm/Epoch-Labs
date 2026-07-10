import { Button, type ButtonProps } from "@/components/ui/button";
import { useAddToCart } from "@/features/cart/hooks/use-add-to-cart";
import type { Product } from "@/features/products/schemas/product-schema";
import type { ProductVariant } from "@/features/products/schemas/product-variant-schema";

interface AddToCartProps extends Omit<ButtonProps, "children" | "variant" | "onClick"> {
	product: Product;
	variant: ProductVariant | null;
	buttonVariant?: ButtonProps["variant"];
}

export function AddToCart({
	product: _product,
	variant,
	buttonVariant,
	disabled,
	...props
}: AddToCartProps): React.ReactNode {
	const { mutate: addToCart, isPending } = useAddToCart();

	const isAvailable = variant?.isAvailable ?? false;

	function handleClick() {
		if (!variant) {
			return;
		}

		addToCart({ variantId: variant.id, quantity: 1 });
	}

	return (
		<Button
			size="xl"
			className="w-full max-w-140"
			disabled={disabled || !isAvailable || isPending}
			variant={buttonVariant}
			onClick={handleClick}
			{...props}
		>
			{isPending ? "Adding…" : isAvailable ? "Add to Cart" : "Out of Stock"}
		</Button>
	);
}
