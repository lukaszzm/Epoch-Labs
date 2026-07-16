import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BackButton } from "@/components/ui/back-button";
import { Container } from "@/components/ui/container";

export const Route = createFileRoute("/_storefront/checkout")({
	component: CheckoutLayout,
});

function CheckoutLayout() {
	return (
		<Container className="py-8">
			<BackButton className="mb-6" />
			<h1 className="mb-8 text-2xl font-semibold">Checkout</h1>
			<Outlet />
		</Container>
	);
}
