import { ApiRoute } from "@/config/api-routes";
import { type Cart, cartSchema } from "@/features/cart/schemas/cart-schema";
import { buildApiUrl } from "@/utils/build-api-url";

export async function fetchCart(sessionId: string): Promise<Cart | null> {
	const url = `${buildApiUrl(ApiRoute.CART)}/${encodeURIComponent(sessionId)}`;
	const res = await fetch(url);

	if (res.status === 404) {
		return null;
	}

	if (!res.ok) {
		throw new Error(`Failed to fetch cart: ${res.statusText}`);
	}

	const json = await res.json();
	return cartSchema.parse(json.data);
}
