import { BasketIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function MiniCart() {
	return (
		<Button variant="ghost" size="icon-xl">
			<BasketIcon className="size-5" aria-hidden />
			<span className="sr-only">View cart</span>
		</Button>
	);
}
