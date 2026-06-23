import { Skeleton } from "@/components/skeleton";

export function ProductCardLoading() {
	return (
		<div aria-busy="true" className="flex flex-col gap-3">
			<span className="sr-only">Loading product</span>
			<Skeleton className="aspect-square w-full rounded-md" />
			<div className="flex flex-col gap-1.5">
				<Skeleton className="h-3 w-1/3 rounded" />
				<div className="flex items-baseline justify-between gap-2">
					<Skeleton className="h-4 w-2/3 rounded" />
					<Skeleton className="h-4 w-12 shrink-0 rounded" />
				</div>
			</div>
		</div>
	);
}
