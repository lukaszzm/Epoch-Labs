import { ApiRoute } from "@/config/api-routes";
import { buildApiUrl } from "@/utils/build-api-url";

export async function ensureCart(sessionId: string): Promise<void> {
	const url = buildApiUrl(ApiRoute.CART);

	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ sessionId }),
	});

	if (!res.ok) {
		throw new Error(`Failed to ensure cart: ${res.statusText}`);
	}
}
