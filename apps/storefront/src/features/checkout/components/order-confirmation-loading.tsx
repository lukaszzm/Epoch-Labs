import { Skeleton } from "@/components/ui/skeleton";

export function OrderConfirmationLoading() {
	return (
		<div className="flex flex-col items-center justify-center py-24 text-center space-y-2">
			<Skeleton className="mb-2 size-16 rounded-full" />
			<Skeleton className="h-9 w-56" />
			<Skeleton className="h-5 w-80" />
			<Skeleton className="mt-2 h-11 w-40 rounded-lg" />
		</div>
	);
}
