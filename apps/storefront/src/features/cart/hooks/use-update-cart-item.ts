import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type PatchCartItem, patchCartItems } from "@/features/cart/api/patch-cart-items";
import { cartQueryKey } from "@/features/cart/utils/cart-query-key";
import { getOrCreateSessionId } from "@/features/cart/utils/get-or-create-session";

export function useUpdateCartItem() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ variantId, quantity }: PatchCartItem) => {
			const sessionId = getOrCreateSessionId();
			return patchCartItems(sessionId, [{ variantId, quantity }], "replace");
		},
		onSuccess: (data) => {
			queryClient.setQueryData(cartQueryKey(getOrCreateSessionId()), data);
		},
	});
}
