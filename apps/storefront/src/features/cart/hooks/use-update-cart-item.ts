import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchCartItems } from "@/features/cart/api/patch-cart-items";
import { cartQueryKey } from "@/features/cart/utils/cart-query-key";
import { getOrCreateSessionId } from "@/features/cart/utils/get-or-create-session";

type UpdateCartItemOptions = { variantId: string; quantity: number };

export function useUpdateCartItem() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ variantId, quantity }: UpdateCartItemOptions) => {
			const sessionId = getOrCreateSessionId();
			return patchCartItems(sessionId, [{ variantId, quantity }]);
		},
		onSuccess: (data) => {
			queryClient.setQueryData(cartQueryKey(getOrCreateSessionId()), data);
		},
	});
}
