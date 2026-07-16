import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { CheckoutFormValues } from "@/features/checkout/schemas/checkout-schema";
import { formatCurrency } from "@/utils/format-currency";

interface PlaceOrderProps {
	itemCount: number;
	subtotalInCents: number;
}

export function PlaceOrder({ itemCount, subtotalInCents }: PlaceOrderProps) {
	const {
		formState: { isSubmitting },
	} = useFormContext<CheckoutFormValues>();

	return (
		<Button type="submit" size="lg" className="w-full" disabled={isSubmitting || itemCount === 0}>
			{isSubmitting ? "Placing Order…" : `Place Order · ${formatCurrency(subtotalInCents)}`}
		</Button>
	);
}
