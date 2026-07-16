import { useMutation } from "@tanstack/react-query";
import { getOrCreateSessionId } from "@/features/cart/utils/get-or-create-session";
import { submitCheckout } from "@/features/checkout/api/submit-checkout";
import type { CheckoutFormValues } from "@/features/checkout/schemas/checkout-schema";

export function useCheckout() {
	return useMutation({
		mutationFn: (values: CheckoutFormValues) => {
			const sessionId = getOrCreateSessionId();
			return submitCheckout(sessionId, values);
		},
	});
}
