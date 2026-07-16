import { ApiRoute } from "@/config/api-routes";
import { type CheckoutOrder, checkoutOrderSchema } from "@/features/checkout/schemas/checkout-order-schema";
import type { CheckoutFormValues } from "@/features/checkout/schemas/checkout-schema";
import { buildApiUrl } from "@/utils/build-api-url";

export async function submitCheckout(
	sessionId: string,
	shippingAddress: CheckoutFormValues,
	currency = "USD",
): Promise<CheckoutOrder> {
	const url = buildApiUrl(ApiRoute.CHECKOUT);

	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ sessionId, shippingAddress, currency }),
	});

	if (!res.ok) {
		throw new Error(`Failed to submit checkout: ${res.statusText}`);
	}

	const json = await res.json();
	return checkoutOrderSchema.parse(json.data);
}
