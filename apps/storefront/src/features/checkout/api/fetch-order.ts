import { ApiRoute } from "@/config/api-routes";
import { type Order, orderSchema } from "@/features/checkout/schemas/order-schema";
import { buildApiUrl } from "@/utils/build-api-url";

export async function fetchOrder(id: string): Promise<Order | null> {
	const url = `${buildApiUrl(ApiRoute.CHECKOUT)}/${encodeURIComponent(id)}`;
	const res = await fetch(url);

	if (res.status === 404) {
		return null;
	}

	if (!res.ok) {
		throw new Error(`Failed to fetch order: ${res.statusText}`);
	}

	const json = await res.json();
	return orderSchema.parse(json.data);
}
