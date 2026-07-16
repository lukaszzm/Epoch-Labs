import { CheckCircleIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AppRoute } from "@/config/app-routes";

export function OrderConfirmation() {
	return (
		<div className="flex flex-col items-center justify-center py-24 text-center space-y-2">
			<CheckCircleIcon className="mb-2 size-16 text-primary" />
			<h1 className="text-3xl font-bold">Order Confirmed!</h1>
			<p className="text-muted-foreground">Thank you for your purchase. Your order has been placed successfully.</p>
			<Button size="lg" className="mt-2" asChild>
				<Link to={AppRoute.HOME}>Continue Shopping</Link>
			</Button>
		</div>
	);
}
