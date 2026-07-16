import type { CartItem } from "@/features/cart/schemas/cart-item-schema";
import { CheckoutSummaryList } from "@/features/checkout/components/checkout-summary-list";
import { CheckoutSummaryTotal } from "@/features/checkout/components/checkout-summary-total";
import { PlaceOrder } from "@/features/checkout/components/place-order";

interface CheckoutSummaryProps {
	cartItems: CartItem[];
}

export function CheckoutSummary({ cartItems }: CheckoutSummaryProps) {
	if (cartItems.length === 0) {
		return null;
	}

	const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
	const subtotalInCents = cartItems.reduce((sum, item) => sum + item.priceSnapshot * item.quantity, 0);

	return (
		<div className="space-y-4">
			<h2 className="text-lg font-medium">Order Summary</h2>
			<div className="rounded-2xl border border-border">
				<CheckoutSummaryList items={cartItems} />
				<CheckoutSummaryTotal itemCount={itemCount} subtotalInCents={subtotalInCents} />
			</div>
			<PlaceOrder itemCount={itemCount} subtotalInCents={subtotalInCents} />
		</div>
	);
}
