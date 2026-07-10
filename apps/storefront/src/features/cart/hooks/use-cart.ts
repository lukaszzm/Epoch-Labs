import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "@/features/cart/api/fetch-cart";
import { cartQueryKey } from "@/features/cart/utils/cart-query-key";
import { getOrCreateSessionId } from "@/features/cart/utils/get-or-create-session";

export function useCart() {
	const sessionId = getOrCreateSessionId();
	return useQuery({
		queryKey: cartQueryKey(sessionId),
		queryFn: () => fetchCart(sessionId),
		enabled: !!sessionId,
		staleTime: 30 * 1000, // 30 seconds
	});
}
