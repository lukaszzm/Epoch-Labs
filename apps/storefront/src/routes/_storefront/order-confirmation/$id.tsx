import { createFileRoute } from "@tanstack/react-router";
import { OrderConfirmation } from "@/features/checkout/components/order-confirmation";
import { OrderConfirmationLoading } from "@/features/checkout/components/order-confirmation-loading";
import { OrderConfirmationNotFound } from "@/features/checkout/components/order-confirmation-not-found";
import { useOrder } from "@/features/checkout/hooks/use-order";

export const Route = createFileRoute("/_storefront/order-confirmation/$id")({
	component: OrderConfirmationPage,
});

function OrderConfirmationPage() {
	const { id } = Route.useParams();
	const { data: order, isLoading, isError } = useOrder(id);

	if (isLoading) {
		return <OrderConfirmationLoading />;
	}

	if (isError || order === null) {
		<OrderConfirmationNotFound />;
	}

	return <OrderConfirmation />;
}
