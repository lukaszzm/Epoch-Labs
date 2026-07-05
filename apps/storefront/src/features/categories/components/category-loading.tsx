import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardLoading } from "@/features/products/components/product-card-loading";

const SKELETON_COUNT = 5;

export function CategoryLoading() {
	return (
		<Container>
			<div className="flex flex-col gap-8">
				<Skeleton className="h-8 w-48 rounded-full" />
				<ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{Array.from({ length: SKELETON_COUNT }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
						<li key={i}>
							<ProductCardLoading />
						</li>
					))}
				</ul>
			</div>
		</Container>
	);
}
