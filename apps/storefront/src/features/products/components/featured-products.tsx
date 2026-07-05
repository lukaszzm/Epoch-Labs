import { FeaturedProductsList } from "@/features/products/components/featured-products-list";

const FEATURED_PRODUCTS_DISPLAY_COUNT = 4;

export function FeaturedProducts() {
	return (
		<section
			id="featured-products"
			aria-labelledby="featured-products-heading"
			className="my-8 container mx-auto px-4 flex flex-col gap-4"
		>
			<h2 id="featured-products-heading" className="text-3xl font-bold mb-4">
				Featured Products
			</h2>
			<FeaturedProductsList displayCount={FEATURED_PRODUCTS_DISPLAY_COUNT} />
		</section>
	);
}
