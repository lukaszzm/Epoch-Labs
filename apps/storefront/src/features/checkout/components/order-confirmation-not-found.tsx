import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AppRoute } from "@/config/app-routes";

export function OrderConfirmationNotFound() {
	return (
		<div className="flex flex-col items-center justify-center py-24 text-center">
			<p className="mb-2 text-lg font-semibold text-destructive">Order not found</p>
			<p className="text-muted-foreground">We couldn't find an order with the provided ID.</p>
			<Button size="lg" asChild className="mt-6">
				<Link to={AppRoute.HOME}>Return to Home</Link>
			</Button>
		</div>
	);
}
