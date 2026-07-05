import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORY_LOADING_SKELETON_COUNT } from "@/features/categories/config/constants";

export function CategoryMenuLoading() {
	return (
		<div className="items-center gap-7 py-1.5 hidden xl:flex">
			{Array.from({ length: CATEGORY_LOADING_SKELETON_COUNT }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
				<Skeleton key={i} className="h-8 w-20 rounded-4xl" />
			))}
		</div>
	);
}
