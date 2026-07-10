import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ensureCart } from "@/features/cart/api/ensure-cart";
import { patchCartItems } from "@/features/cart/api/patch-cart-items";
import { cartQueryKey } from "@/features/cart/utils/cart-query-key";
import { getOrCreateSessionId } from "@/features/cart/utils/get-or-create-session";

type AddToCartOptions = { variantId: string; quantity?: number };

export function useAddToCart() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ variantId, quantity = 1 }: AddToCartOptions) => {
			const sessionId = getOrCreateSessionId();
			await ensureCart(sessionId);
			return patchCartItems(sessionId, [{ variantId, quantity }]);
		},
		onSuccess: (data) => {
			queryClient.setQueryData(cartQueryKey(getOrCreateSessionId()), data);
		},
	});
}
