import { Skeleton } from "@/components/ui/skeleton";

export function OrderConfirmationLoading() {
	return (
		<div className="flex flex-col items-center justify-center py-24 text-center space-y-2">
			<Skeleton className="mb-2 size-16 rounded-full" />
			<Skeleton className="h-9 w-56" />
			<Skeleton className="h-5 w-80" />
			<div className="mt-6 w-full max-w-sm rounded-2xl border border-border bg-card divide-y divide-border">
				{Array.from({ length: 4 }).map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton rows
					<div key={i} className="flex justify-between px-4 py-3">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-32" />
					</div>
				))}
			</div>
			<div className="mt-2 w-full max-w-sm rounded-2xl border border-border bg-card">
				<Skeleton className="mx-4 mt-3 mb-2 h-3 w-24" />
				<div className="divide-y divide-border">
					{Array.from({ length: 3 }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton rows
						<div key={i} className="flex items-center gap-3 px-4 py-3">
							<Skeleton className="size-12 shrink-0 rounded-lg" />
							<div className="flex-1 space-y-1.5">
								<Skeleton className="h-4 w-36" />
								<Skeleton className="h-3 w-24" />
							</div>
							<Skeleton className="h-4 w-14 shrink-0" />
						</div>
					))}
				</div>
			</div>
			<Skeleton className="mt-4 h-11 w-40 rounded-lg" />
		</div>
	);
}
