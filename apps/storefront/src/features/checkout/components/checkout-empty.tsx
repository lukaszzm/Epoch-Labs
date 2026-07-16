import { BasketIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export function CheckoutEmpty() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<BasketIcon />
				</EmptyMedia>
				<EmptyTitle>Your cart is empty</EmptyTitle>
				<EmptyDescription>Looks like you haven't added anything to your cart yet.</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button size="lg" asChild>
					<Link to="/">Continue Shopping</Link>
				</Button>
			</EmptyContent>
		</Empty>
	);
}
