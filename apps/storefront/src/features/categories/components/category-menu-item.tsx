import { Link } from "@tanstack/react-router";
import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { AppRoute } from "@/config/app-routes";
import type { CategoryNode } from "@/features/categories/schemas/category-node-schema";
import { categoryPathToSplat } from "@/features/categories/utils/category-path-to-splat";

export interface CategoryMenuItemProps {
	categoryNode: CategoryNode;
}

export function CategoryMenuItem({ categoryNode }: CategoryMenuItemProps) {
	if (categoryNode.children.length === 0) {
		return (
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<Link to={AppRoute.CATEGORY} params={{ _splat: categoryPathToSplat(categoryNode.path) }}>
						{categoryNode.name}
					</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>
		);
	}

	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>{categoryNode.name}</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="w-96">
					<li>
						<NavigationMenuLink className="font-medium" asChild>
							<Link to={AppRoute.CATEGORY} params={{ _splat: categoryPathToSplat(categoryNode.path) }}>
								View All
							</Link>
						</NavigationMenuLink>
					</li>
					{categoryNode.children.map((child) => (
						<li key={child.id}>
							<NavigationMenuLink asChild>
								<Link
									to={AppRoute.CATEGORY}
									className="font-normal"
									params={{ _splat: categoryPathToSplat(child.path) }}
								>
									{child.name}
								</Link>
							</NavigationMenuLink>
						</li>
					))}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);
}
