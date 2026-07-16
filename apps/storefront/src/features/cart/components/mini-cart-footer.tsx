import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SheetFooter } from "@/components/ui/sheet";
import { formatCurrency } from "@/utils/format-currency";

interface MiniCartFooterProps {
	subtotalInCents: number;
	itemCount: number;
	onProceedToCheckout?: () => void;
}

export function MiniCartFooter({ subtotalInCents, itemCount, onProceedToCheckout }: MiniCartFooterProps) {
	const subtotal = formatCurrency(subtotalInCents, { currency: "USD" });
	const isEmptyCart = itemCount === 0;

	return (
		<SheetFooter className="flex-col gap-3 border-t border-border pt-4">
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Subtotal</span>
				<span className="font-semibold">{subtotal}</span>
			</div>
			<Button size="lg" className="w-full" disabled={isEmptyCart} onClick={onProceedToCheckout} asChild>
				<Link to="/checkout">Proceed to Checkout</Link>
			</Button>
		</SheetFooter>
	);
}
