import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductLoading() {
	return (
		<Container>
			<Skeleton className="h-8 w-20 rounded-full mb-6" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
				<Skeleton className="aspect-square w-full rounded-xl" />
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-2">
						<Skeleton className="h-4 w-24 rounded" />
						<Skeleton className="h-8 w-3/4 rounded" />
					</div>
					<Skeleton className="h-7 w-28 rounded" />
					<div className="flex flex-col gap-2">
						<Skeleton className="h-4 w-full rounded" />
						<Skeleton className="h-4 w-5/6 rounded" />
						<Skeleton className="h-4 w-4/6 rounded" />
					</div>
					<div className="flex flex-col gap-2">
						<Skeleton className="h-4 w-16 rounded" />
						<div className="flex gap-2">
							<Skeleton className="h-9 w-20 rounded-full" />
							<Skeleton className="h-9 w-20 rounded-full" />
							<Skeleton className="h-9 w-20 rounded-full" />
						</div>
					</div>
					<Skeleton className="h-11 w-full rounded-full" />
				</div>
			</div>
		</Container>
	);
}
