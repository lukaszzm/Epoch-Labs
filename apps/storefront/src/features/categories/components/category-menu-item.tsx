import { Link } from "@tanstack/react-router";
import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { CategoryNode } from "@/features/categories/schemas/category-node-schema";

export interface CategoryMenuItemProps {
	categoryNode: CategoryNode;
}

export function CategoryMenuItem({ categoryNode }: CategoryMenuItemProps) {
	if (categoryNode.children.length === 0) {
		return (
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<Link to={`/categories/$path`} params={{ path: categoryNode.path }}>
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
						<NavigationMenuLink asChild>
							<Link to={`/categories/$path`} params={{ path: categoryNode.path }}>
								View All
							</Link>
						</NavigationMenuLink>
					</li>
					{categoryNode.children.map((child) => (
						<li key={child.id}>
							<NavigationMenuLink asChild>
								<Link to={`/categories/$path`} className="font-normal" params={{ path: child.path }}>
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
