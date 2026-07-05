import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { Category } from "@/features/categories/schemas/category-schema";

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
							<Link to="/categories/$path" params={{ path: subcategory.path }}>
								{subcategory.name}
							</Link>
						</Button>
					</li>
				))}
			</ul>
		</section>
	);
}
