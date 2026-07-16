import type { CartItem } from "@/features/cart/schemas/cart-item-schema";
import { ProductImage } from "@/features/products/components/product-image";
import { formatCurrency } from "@/utils/format-currency";

interface CheckoutSummaryListItemProps {
	item: CartItem;
}

export function CheckoutSummaryListItem({ item }: CheckoutSummaryListItemProps) {
	const primaryImage = item.product.images?.find((img) => img.isPrimary);

	return (
		<li className="flex items-center gap-3 p-4">
			<div className="size-14 overflow-hidden rounded-xl bg-muted">
				<ProductImage
					src={primaryImage?.url ?? ""}
					alt={primaryImage?.alt ?? item.product.name}
					layout="constrained"
					width={64}
					height={64}
					className="size-full object-cover"
				/>
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate text-sm font-medium">{item.product.name}</p>
				<p className="text-xs text-muted-foreground">{item.variant.name}</p>
				<p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
			</div>
			<span className="shrink-0 text-sm font-medium">{formatCurrency(item.priceSnapshot * item.quantity)}</span>
		</li>
	);
}
