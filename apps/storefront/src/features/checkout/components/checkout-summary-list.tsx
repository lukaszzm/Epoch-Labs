import type { CartItem } from "@/features/cart/schemas/cart-item-schema";
import { CheckoutSummaryListItem } from "@/features/checkout/components/checkout-summary-list-item";

interface CheckoutSummaryListProps {
	items: CartItem[];
}

export function CheckoutSummaryList({ items }: CheckoutSummaryListProps) {
	return (
		<ul className="divide-y divide-border">
			{items.map((item) => (
				<CheckoutSummaryListItem key={item.id} item={item} />
			))}
		</ul>
	);
}
