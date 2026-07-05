import { CategoryMobileMenuEmpty } from "@/features/categories/components/category-mobile-menu-empty";
import { CategoryMobileMenuItem } from "@/features/categories/components/category-mobile-menu-item";
import { CategoryMobileMenuLoading } from "@/features/categories/components/category-mobile-menu-loading";
import { useCategoryTree } from "@/features/categories/hooks/use-category-tree";

export interface CategoryMobileMenuContentProps {
	onNavigate: () => void;
}

export function CategoryMobileMenuContent({ onNavigate }: CategoryMobileMenuContentProps) {
	const { data: rootCategory, isLoading } = useCategoryTree();

	if (isLoading) {
		return <CategoryMobileMenuLoading />;
	}

	if (!rootCategory) {
		return <CategoryMobileMenuEmpty />;
	}

	return (
		<nav className="flex flex-col gap-1" aria-label="Category navigation">
			{rootCategory.children.map((category) => (
				<CategoryMobileMenuItem key={category.id} categoryNode={category} onNavigate={onNavigate} />
			))}
		</nav>
	);
}
