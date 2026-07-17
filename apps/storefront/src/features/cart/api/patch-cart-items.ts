import { ApiRoute } from "@/config/api-routes";
import { type Cart, cartSchema } from "@/features/cart/schemas/cart-schema";
import { buildApiUrl } from "@/utils/build-api-url";

type QuantityUpdateMode = "accumulate" | "replace";
export interface PatchCartItem {
	variantId: string;
	quantity: number;
}

export async function patchCartItems(
	sessionId: string,
	items: ReadonlyArray<PatchCartItem>,
	mode: QuantityUpdateMode,
): Promise<Cart> {
	const url = `${buildApiUrl(ApiRoute.CART)}/${encodeURIComponent(sessionId)}/items`;

	const res = await fetch(url, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ items, mode }),
	});

	if (!res.ok) {
		throw new Error(`Failed to update cart: ${res.statusText}`);
	}

	const json = await res.json();
	return cartSchema.parse(json.data);
}
