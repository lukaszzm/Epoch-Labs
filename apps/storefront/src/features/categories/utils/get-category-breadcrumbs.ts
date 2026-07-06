import type { CategoryBreadcrumbItem } from "@/features/categories/types";
import { slugToLabel } from "@/utils/slug-to-label";

export function getCategoryBreadcrumbs(categoryPath: string): CategoryBreadcrumbItem[] {
	const paths = categoryPath.split("/").filter(Boolean);

	return paths.map((path, index) => {
		const isLast = index === paths.length - 1;
		const categoryPath = paths.slice(0, index + 1).join("/");

		return {
			path: categoryPath,
			label: slugToLabel(path),
			isLast,
		};
	});
}
