import { Skeleton } from "@/components/ui/skeleton";

function FormFieldSkeleton() {
	return (
		<div className="space-y-2">
			<Skeleton className="h-4 w-24 rounded-md" />
			<Skeleton className="h-9 w-full rounded-md" />
		</div>
	);
}

export function CheckoutLoading() {
	return (
		<div className="grid gap-8 lg:grid-cols-[1fr_360px]">
			<div className="space-y-4">
				<Skeleton className="h-6 w-40 rounded-md" />
				<FormFieldSkeleton />
				<FormFieldSkeleton />
				<FormFieldSkeleton />
				<div className="grid grid-cols-2 gap-4">
					<FormFieldSkeleton />
					<FormFieldSkeleton />
				</div>
				<div className="grid grid-cols-2 gap-4">
					<FormFieldSkeleton />
					<FormFieldSkeleton />
				</div>
				<FormFieldSkeleton />
			</div>
			<div className="space-y-4">
				<Skeleton className="h-6 w-32 rounded-md" />
				<div className="rounded-2xl border border-border p-4 space-y-3">
					<Skeleton className="h-14 w-full rounded-md" />
					<Skeleton className="h-14 w-full rounded-md" />
					<Skeleton className="h-14 w-full rounded-md" />
					<div className="border-t border-border pt-3 space-y-2">
						<div className="flex justify-between">
							<Skeleton className="h-4 w-20 rounded-md" />
							<Skeleton className="h-4 w-16 rounded-md" />
						</div>
						<div className="flex justify-between">
							<Skeleton className="h-4 w-16 rounded-md" />
							<Skeleton className="h-4 w-20 rounded-md" />
						</div>
					</div>
				</div>
				<Skeleton className="h-11 w-full rounded-lg" />
			</div>
		</div>
	);
}
