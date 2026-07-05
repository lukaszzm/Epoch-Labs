import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORY_LOADING_SKELETON_COUNT } from "@/features/categories/config/constants";

export function CategoryMobileMenuLoading() {
	return (
		<div className="flex flex-col items-center gap-1">
			{Array.from({ length: CATEGORY_LOADING_SKELETON_COUNT }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
				<Skeleton key={i} className="h-10 w-full rounded-4xl" />
			))}
		</div>
	);
}
