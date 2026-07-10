import { BasketIcon } from "@phosphor-icons/react";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export function MiniCartEmpty() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<BasketIcon />
				</EmptyMedia>
				<EmptyTitle>Your cart is empty</EmptyTitle>
				<EmptyDescription>Looks like you haven't added anything to your cart yet.</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
