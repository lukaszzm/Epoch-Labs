import type { listCategories } from "@/features/categories/categories.queries";

type CategoryRow = Awaited<ReturnType<typeof listCategories>>[number];

export type CategoryNode = CategoryRow & { children: CategoryNode[] };

export function buildCategoryTree(
	rows: ReadonlyArray<CategoryRow>,
): CategoryNode[] {
	const map = new Map<string, CategoryNode>();
	const roots: CategoryNode[] = [];

	for (const row of rows) {
		map.set(row.id, { ...row, children: [] });
	}

	for (const row of rows) {
		const node = map.get(row.id) as CategoryNode;

		if (!row.parentId) {
			roots.push(node);
			continue;
		}

		const parent = map.get(row.parentId);

		if (parent) {
			parent.children.push(node);
		} else {
			roots.push(node); // Parent not in the indexed set — treat as root
		}
	}

	return roots;
}
