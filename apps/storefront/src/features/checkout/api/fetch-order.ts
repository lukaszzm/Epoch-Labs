import { ApiRoute } from "@/config/api-routes";
import { type CheckoutOrder, checkoutOrderSchema } from "@/features/checkout/schemas/checkout-order-schema";
import { buildApiUrl } from "@/utils/build-api-url";

export async function fetchOrder(id: string): Promise<CheckoutOrder | null> {
	const url = `${buildApiUrl(ApiRoute.CHECKOUT)}/${encodeURIComponent(id)}`;
	const res = await fetch(url);

	if (res.status === 404) {
		return null;
	}

	if (!res.ok) {
		throw new Error(`Failed to fetch order: ${res.statusText}`);
	}

	const json = await res.json();
	return checkoutOrderSchema.parse(json.data);
}
