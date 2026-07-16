import { formatCurrency } from "@/utils/format-currency";

interface CheckoutSummaryTotalProps {
	itemCount: number;
	subtotalInCents: number;
}
export function CheckoutSummaryTotal({ itemCount, subtotalInCents }: CheckoutSummaryTotalProps) {
	return (
		<div className="space-y-2 border-t border-border p-4">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">
					Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
				</span>
				<span className="font-semibold">{formatCurrency(subtotalInCents)}</span>
			</div>
			<div className="flex justify-between text-xs ">
				<span className="text-muted-foreground">Shipping</span>
				<span className="font-semibold">Free</span>
			</div>
		</div>
	);
}
