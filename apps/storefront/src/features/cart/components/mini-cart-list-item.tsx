import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AppRoute } from "@/config/app-routes";
import { useUpdateCartItem } from "@/features/cart/hooks/use-update-cart-item";
import type { CartItem } from "@/features/cart/schemas/cart-item-schema";
import { ProductImage } from "@/features/products/components/product-image";
import { formatCurrency } from "@/utils/format-currency";

interface MiniCartListItemProps {
	item: CartItem;
	onNavigate: () => void;
}

export function MiniCartListItem({ item, onNavigate }: MiniCartListItemProps) {
	const { mutate: updateItem, isPending } = useUpdateCartItem();

	const primaryImage = item.product.images?.find((img) => img.isPrimary) ?? item.product.images?.at(0);
	const lineTotal = formatCurrency(item.priceSnapshot * item.quantity, { currency: "USD" });

	return (
		<div className="flex gap-3 py-3 border-b border-border last:border-0">
			<Link to={AppRoute.PRODUCT} params={{ slug: item.product.slug }} className="shrink-0" onClick={onNavigate}>
				<div className="size-16 overflow-hidden rounded-md bg-muted">
					<ProductImage
						src={primaryImage?.url ?? ""}
						alt={primaryImage?.alt ?? item.product.name}
						layout="constrained"
						width={64}
						height={64}
						className="size-full object-cover"
					/>
				</div>
			</Link>
			<div className="flex min-w-0 flex-1 flex-col gap-1">
				<Link
					to={AppRoute.PRODUCT}
					params={{ slug: item.product.slug }}
					onClick={onNavigate}
					className="text-sm font-medium leading-snug line-clamp-2 hover:underline"
				>
					{item.product.name}
				</Link>
				<span className="text-xs text-muted-foreground">{item.variant.name}</span>
				<div className="flex items-center justify-between gap-2 mt-auto">
					<div className="flex items-center gap-0.5">
						<Button
							aria-label={item.quantity === 1 ? "Remove item" : "Decrease quantity"}
							onClick={() => updateItem({ variantId: item.productVariantId, quantity: item.quantity - 1 })}
							disabled={isPending}
							variant="ghost"
							size="icon-sm"
						>
							{item.quantity === 1 ? <TrashIcon /> : <MinusIcon />}
						</Button>
						<span className="min-w-6 text-center text-sm tabular-nums">{item.quantity}</span>
						<Button
							aria-label="Increase quantity"
							onClick={() => updateItem({ variantId: item.productVariantId, quantity: item.quantity + 1 })}
							disabled={isPending}
							variant="ghost"
							size="icon-sm"
						>
							<PlusIcon />
						</Button>
					</div>
					<span className="text-sm font-medium">{lineTotal}</span>
				</div>
			</div>
		</div>
	);
}
