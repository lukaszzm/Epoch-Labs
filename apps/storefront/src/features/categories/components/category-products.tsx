import { PackageIcon } from "@phosphor-icons/react";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import type { CategoryProductProjection } from "@/features/categories/schemas/category-product-schema";
import { ProductCard } from "@/features/products/components/product-card";

export interface CategoryProductsProps {
	products: CategoryProductProjection[];
}

export function CategoryProducts({ products }: CategoryProductsProps) {
	if (products.length === 0) {
		return (
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<PackageIcon />
					</EmptyMedia>
					<EmptyTitle>No products yet</EmptyTitle>
					<EmptyDescription>This category doesn't have any products at the moment.</EmptyDescription>
				</EmptyHeader>
				<EmptyContent />
			</Empty>
		);
	}

	return (
		<ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{products.map((product) => (
				<li key={product.id}>
					<ProductCard product={product} />
				</li>
			))}
		</ul>
	);
}
