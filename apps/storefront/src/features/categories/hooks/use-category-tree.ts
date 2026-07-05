import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getCategoryTree } from "@/features/categories/api/get-category-tree";

export function useCategoryTree() {
	const getCategoryTreeFn = useServerFn(getCategoryTree);

	return useQuery({
		queryKey: ["categories", "tree"],
		queryFn: () => getCategoryTreeFn(),
		staleTime: 1000 * 60 * 5,
	});
}
