import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Container } from "@/components/ui/container";
import { getCategoryByPath } from "@/features/categories/api/get-category-by-path";
import { CategoryBreadcrumb } from "@/features/categories/components/category-breadcrumb";
import { CategoryError } from "@/features/categories/components/category-error";
import { CategoryLoading } from "@/features/categories/components/category-loading";
import { CategoryNotFound } from "@/features/categories/components/category-not-found";
import { CategoryProducts } from "@/features/categories/components/category-products";
import { CategorySubcategories } from "@/features/categories/components/category-subcategories";

export const Route = createFileRoute("/_storefront/categories/$")({
	beforeLoad: ({ params }) => {
		if (!params._splat) {
			throw notFound();
		}
	},
	component: CategoryPage,
});

function CategoryPage() {
	const { _splat } = Route.useParams();
	const getCategoryFn = useServerFn(getCategoryByPath);

	const path = _splat ?? ""; // Default to an empty string just to satisfey the type checker, but this should never happen due to the beforeLoad check above.

	const {
		data: category,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["categories", path],
		queryFn: () => getCategoryFn({ data: { path } }),
	});

	if (isLoading) {
		return <CategoryLoading />;
	}

	if (error) {
		return <CategoryError />;
	}

	if (!category) {
		return <CategoryNotFound />;
	}

	return (
		<Container className="flex flex-col gap-8">
			<h1 className="text-2xl font-semibold tracking-tight">{category.name}</h1>
			<CategoryBreadcrumb currentCategory={category} />
			<CategorySubcategories subcategories={category.children} />
			<CategoryProducts products={category.products} />
		</Container>
	);
}
