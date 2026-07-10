import { ApiRoute } from "@/config/api-routes";
import { type Cart, cartSchema } from "@/features/cart/schemas/cart-schema";
import { buildApiUrl } from "@/utils/build-api-url";

export async function patchCartItems(
	sessionId: string,
	items: Array<{ variantId: string; quantity: number }>,
): Promise<Cart> {
	const url = `${buildApiUrl(ApiRoute.CART)}/${encodeURIComponent(sessionId)}/items`;

	const res = await fetch(url, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ items }),
	});

	if (!res.ok) {
		throw new Error(`Failed to update cart: ${res.statusText}`);
	}

	const json = await res.json();
	return cartSchema.parse(json.data);
}
