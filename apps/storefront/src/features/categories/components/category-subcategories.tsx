import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AppRoute } from "@/config/app-routes";
import type { Category } from "@/features/categories/schemas/category-schema";
import { categoryPathToSplat } from "@/features/categories/utils/category-path-to-splat";

export interface CategorySubcategoriesProps {
	subcategories: Category[];
}

export function CategorySubcategories({ subcategories }: CategorySubcategoriesProps) {
	if (subcategories.length === 0) {
		return null;
	}

	return (
		<section aria-label="Subcategories">
			<h2 className="text-base font-medium text-muted-foreground mb-3">Subcategories</h2>
			<ul className="flex flex-wrap gap-2 list-none">
				{subcategories.map((subcategory) => (
					<li key={subcategory.id}>
						<Button variant="outline" size="sm" asChild>
							<Link to={AppRoute.CATEGORY} params={{ _splat: categoryPathToSplat(subcategory.path) }}>
								{subcategory.name}
							</Link>
						</Button>
					</li>
				))}
			</ul>
		</section>
	);
}
