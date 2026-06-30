import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { getProductBySlug } from "@/features/products/api/get-product-by-slug";
import { ProductDetails } from "@/features/products/components/product-details";
import { ProductError } from "@/features/products/components/product-error";
import { ProductLoading } from "@/features/products/components/product-loading";
import { ProductNotFound } from "@/features/products/components/product-not-found";
import { ProductPreview } from "@/features/products/components/product-preview";

export const Route = createFileRoute("/_storefront/products/$slug")({
	component: ProductDetailsPage,
});

function ProductDetailsPage() {
	const { slug } = Route.useParams();
	const getProductFn = useServerFn(getProductBySlug);

	const { data, isLoading, error } = useQuery({
		queryKey: ["products", slug],
		queryFn: () => getProductFn({ data: { slug } }),
	});

	if (isLoading) {
		return <ProductLoading />;
	}

	if (error) {
		return <ProductError />;
	}

	if (!data) {
		return <ProductNotFound />;
	}

	if (data.variants.length === 0) {
		return <ProductPreview product={data} />;
	}

	return <ProductDetails product={data} />;
}
