import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Container } from "@/components/ui/container";
import { getCategoryByPath } from "@/features/categories/api/get-category-by-path";
import { CategoryBreadcrumb } from "@/features/categories/components/category-breadcrumb";
import { CategoryError } from "@/features/categories/components/category-error";
import { CategoryLoading } from "@/features/categories/components/category-loading";
import { CategoryNotFound } from "@/features/categories/components/category-not-found";
import { CategoryPagination } from "@/features/categories/components/category-pagination";
import { CategoryProducts } from "@/features/categories/components/category-products";
import { CategorySort } from "@/features/categories/components/category-sort";
import { CategorySubcategories } from "@/features/categories/components/category-subcategories";
import { categorySearchParamsSchema } from "@/features/categories/schemas/category-search-params-schema";

export const Route = createFileRoute("/_storefront/categories/$")({
	validateSearch: categorySearchParamsSchema,
	beforeLoad: ({ params }) => {
		if (!params._splat) {
			throw notFound();
		}
	},
	component: CategoryPage,
});

function CategoryPage() {
	const { _splat } = Route.useParams();
	const { sort, page } = Route.useSearch();
	const getCategoryFn = useServerFn(getCategoryByPath);

	const path = _splat ?? "";

	const {
		data: category,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["categories", path, sort, page],
		queryFn: () => getCategoryFn({ data: { path, sort, page } }),
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
		<Container className="flex flex-col gap-6">
			<div className="flex flex-col gap-1">
				<h1 className="text-2xl font-semibold tracking-tight">{category.name}</h1>
				<CategoryBreadcrumb currentCategory={category} />
			</div>
			<div className="flex gap-8">
				{category.children.length > 0 && (
					<aside className="w-56 shrink-0">
						<CategorySubcategories subcategories={category.children} />
					</aside>
				)}
				<div className="min-w-0 flex-1 flex flex-col gap-6">
					<div className="flex items-center justify-between">
						<p className="text-sm text-muted-foreground">
							{category.total} {category.total === 1 ? "product" : "products"}
						</p>
						<CategorySort />
					</div>
					<CategoryProducts products={category.products} />
					<CategoryPagination totalPages={category.totalPages} />
				</div>
			</div>
		</Container>
	);
}
