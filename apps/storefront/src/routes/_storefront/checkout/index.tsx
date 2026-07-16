import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "@/features/cart/hooks/use-cart";
import { CheckoutEmpty } from "@/features/checkout/components/checkout-empty";
import { CheckoutForm } from "@/features/checkout/components/checkout-form";
import { CheckoutLoading } from "@/features/checkout/components/checkout-loading";
import { CheckoutShippingAddress } from "@/features/checkout/components/checkout-shipping-address";
import { CheckoutSummary } from "@/features/checkout/components/checkout-summary";

export const Route = createFileRoute("/_storefront/checkout/")({
	component: CheckoutPage,
});

function CheckoutPage() {
	const { data: cart, isPending } = useCart();

	const cartItems = cart?.items ?? [];

	if (isPending) {
		return <CheckoutLoading />;
	}

	if (!cartItems || cartItems.length === 0) {
		return <CheckoutEmpty />;
	}

	return (
		<CheckoutForm>
			<div className="grid gap-8 lg:grid-cols-[1fr_360px]">
				<CheckoutShippingAddress />
				<CheckoutSummary cartItems={cartItems} />
			</div>
		</CheckoutForm>
	);
}
