import { Button } from "@/components/ui/button";
import { SheetFooter } from "@/components/ui/sheet";
import { formatCurrency } from "@/utils/format-currency";

interface MiniCartFooterProps {
	subtotalInCents: number;
}

export function MiniCartFooter({ subtotalInCents }: MiniCartFooterProps) {
	const subtotal = formatCurrency(subtotalInCents, { currency: "USD" });

	return (
		<SheetFooter className="flex-col gap-3 border-t border-border pt-4">
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Subtotal</span>
				<span className="font-semibold">{subtotal}</span>
			</div>
			<Button size="lg" className="w-full" disabled>
				Proceed to Checkout
			</Button>
		</SheetFooter>
	);
}
