import { Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppRoute } from "@/config/app-routes";
import type { Category } from "@/features/categories/schemas/category-schema";
import { categoryPathToSplat } from "@/features/categories/utils/category-path-to-splat";
import { getCategoryBreadcrumbs } from "@/features/categories/utils/get-category-breadcrumbs";

export interface CategoryBreadcrumbProps {
	currentCategory: Category;
}

const HOME_BREADCRUMB = {
	path: AppRoute.HOME,
	label: "Home",
} as const;

export function CategoryBreadcrumb({ currentCategory }: CategoryBreadcrumbProps) {
	const breadcrumbItems = getCategoryBreadcrumbs(currentCategory.path);

	if (breadcrumbItems.length === 0) {
		return (
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbPage>{HOME_BREADCRUMB.label}</BreadcrumbPage>
				</BreadcrumbList>
			</Breadcrumb>
		);
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link to={HOME_BREADCRUMB.path}>{HOME_BREADCRUMB.label}</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{breadcrumbItems.map((item) =>
					item.isLast ? (
						<BreadcrumbItem key={item.path}>
							<BreadcrumbPage>{item.label}</BreadcrumbPage>
						</BreadcrumbItem>
					) : (
						<Fragment key={item.path}>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link to={AppRoute.CATEGORY} params={{ _splat: categoryPathToSplat(item.path) }}>
										{item.label}
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</Fragment>
					),
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
