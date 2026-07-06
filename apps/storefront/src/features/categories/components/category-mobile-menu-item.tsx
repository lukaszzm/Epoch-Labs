import { CaretDownIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AppRoute } from "@/config/app-routes";
import type { CategoryNode } from "@/features/categories/schemas/category-node-schema";
import { categoryPathToSplat } from "@/features/categories/utils/category-path-to-splat";

export interface CategoryMobileMenuItemProps {
	categoryNode: CategoryNode;
	onNavigate: () => void;
}

export function CategoryMobileMenuItem({ categoryNode, onNavigate }: CategoryMobileMenuItemProps) {
	const [open, setOpen] = useState(false);

	if (categoryNode.children.length === 0) {
		return (
			<Button variant="ghost" size="lg" className="justify-start" asChild>
				<Link to={AppRoute.CATEGORY} params={{ _splat: categoryPathToSplat(categoryNode.path) }} onClick={onNavigate}>
					{categoryNode.name}
				</Link>
			</Button>
		);
	}

	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<CollapsibleTrigger asChild>
				<Button variant="ghost" size="lg" className="w-full justify-between">
					{categoryNode.name}
					<CaretDownIcon aria-hidden />
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<ul className="mt-0.5 flex flex-col gap-0.5 border-l border-border ml-4 pl-3">
					<li>
						<Button variant="ghost" size="lg" className="w-full justify-start" asChild>
							<Link
								to={AppRoute.CATEGORY}
								params={{ _splat: categoryPathToSplat(categoryNode.path) }}
								onClick={onNavigate}
							>
								View All
							</Link>
						</Button>
					</li>
					{categoryNode.children.map((child) => (
						<li key={child.id}>
							<Button variant="ghost" size="lg" className="w-full justify-start font-normal" asChild>
								<Link to={AppRoute.CATEGORY} params={{ _splat: categoryPathToSplat(child.path) }} onClick={onNavigate}>
									{child.name}
								</Link>
							</Button>
						</li>
					))}
				</ul>
			</CollapsibleContent>
		</Collapsible>
	);
}
