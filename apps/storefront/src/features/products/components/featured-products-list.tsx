import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getFeaturedProducts } from "@/features/products/api/get-featured-products";
import { FeaturedProductsError } from "@/features/products/components/featured-products-error";
import { FeaturedProductsLoading } from "@/features/products/components/featured-products-loading";
import { ProductCard } from "@/features/products/components/product-card";

interface FeaturedProductsListProps {
	displayCount: number;
}

export function FeaturedProductsList({ displayCount }: FeaturedProductsListProps) {
	const getFeaturedProductsFn = useServerFn(getFeaturedProducts);

	const { data, isLoading, error } = useQuery({
		queryKey: ["products", "featured", displayCount],
		queryFn: () => getFeaturedProductsFn({ data: { limit: displayCount } }),
	});

	if (isLoading) {
		return <FeaturedProductsLoading displayCount={displayCount} />;
	}

	if (!data || error) {
		return <FeaturedProductsError />;
	}

	return (
		<ul className="grid list-none grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{data.results.map((product) => (
				<li key={product.id}>
					<ProductCard product={product} />
				</li>
			))}
		</ul>
	);
}
