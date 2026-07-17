import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ensureCart } from "@/features/cart/api/ensure-cart";
import { patchCartItems } from "@/features/cart/api/patch-cart-items";
import { cartQueryKey } from "@/features/cart/utils/cart-query-key";
import { getOrCreateSessionId } from "@/features/cart/utils/get-or-create-session";

interface AddToCartOptions {
	variantId: string;
	quantity?: number;
}

interface UseAddToCartOptions {
	onSuccess?: () => void;
}

export function useAddToCart({ onSuccess }: UseAddToCartOptions = {}) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ variantId, quantity = 1 }: AddToCartOptions) => {
			const sessionId = getOrCreateSessionId();
			await ensureCart(sessionId);
			return patchCartItems(sessionId, [{ variantId, quantity }], "accumulate");
		},
		onSuccess: (data) => {
			queryClient.setQueryData(cartQueryKey(getOrCreateSessionId()), data);
			onSuccess?.();
		},
	});
}
