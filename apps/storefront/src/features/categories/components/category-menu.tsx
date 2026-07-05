import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { CategoryMenuItem } from "@/features/categories/components/category-menu-item";
import { CategoryMenuLoading } from "@/features/categories/components/category-menu-loading";
import { useCategoryTree } from "@/features/categories/hooks/use-category-tree";

export function CategoryMenu() {
	const { data: rootCategory, isLoading } = useCategoryTree();

	if (isLoading) {
		return <CategoryMenuLoading />;
	}

	if (!rootCategory?.children?.length) {
		return null;
	}

	return (
		<NavigationMenu className="hidden xl:flex" aria-label="Category navigation">
			<NavigationMenuList>
				{rootCategory.children.map((category) => (
					<CategoryMenuItem key={category.id} categoryNode={category} />
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
