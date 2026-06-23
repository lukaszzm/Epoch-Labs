import { ProductCardLoading } from "@/features/products/components/product-card-loading";

interface FeaturedProductsLoadingProps {
	displayCount: number;
}

export function FeaturedProductsLoading({ displayCount }: FeaturedProductsLoadingProps) {
	return (
		<ul
			role="status"
			aria-label="Loading featured products"
			className="grid list-none grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
		>
			{Array.from({ length: displayCount }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <!-- Using index as key is acceptable here since the list is static and not expected to change. -->
				<li key={index}>
					<ProductCardLoading />
				</li>
			))}
		</ul>
	);
}
