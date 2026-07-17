import { Button, type ButtonProps } from "@/components/ui/button";
import { useAddToCart } from "@/features/cart/hooks/use-add-to-cart";
import type { ProductVariant } from "@/features/products/schemas/product-variant-schema";

interface AddToCartProps extends Omit<ButtonProps, "children" | "variant" | "onClick"> {
	variant: ProductVariant;
	quantity?: number;
	buttonVariant?: ButtonProps["variant"];
	onAddToCart?: () => void;
}

export function AddToCart({
	variant: { id, isAvailable },
	quantity = 1,
	buttonVariant,
	disabled,
	onAddToCart,
	...props
}: AddToCartProps): React.ReactNode {
	const { mutate: addToCart, isPending } = useAddToCart({ onSuccess: onAddToCart });

	return (
		<Button
			size="xl"
			className="w-full max-w-120"
			disabled={disabled || !isAvailable || isPending}
			variant={buttonVariant}
			onClick={() => addToCart({ variantId: id, quantity })}
			{...props}
		>
			{isPending ? "Adding…" : isAvailable ? "Add to Cart" : "Out of Stock"}
		</Button>
	);
}
