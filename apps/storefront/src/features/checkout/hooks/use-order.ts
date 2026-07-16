import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "@/features/checkout/api/fetch-order";

export function orderQueryKey(id: string) {
	return ["order", id] as const;
}

export function useOrder(id: string) {
	return useQuery({
		queryKey: orderQueryKey(id),
		queryFn: () => fetchOrder(id),
		staleTime: 5 * 60 * 1000, // 5 minutes - orders don't change often
		retry: false,
	});
}
