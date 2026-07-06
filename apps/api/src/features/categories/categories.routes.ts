import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HttpStatusCode } from "@/config/http-status-code";
import {
	getCategoryByPath,
	getCategoryChildren,
	getCategorySubtreeProducts,
	listCategories,
} from "@/features/categories/categories.queries";
import { categoryListQuerySchema, categoryPathQuerySchema } from "@/features/categories/categories.schemas";
import { buildCategoryTree } from "@/features/categories/utils/build-category-tree";

const app = new Hono();

/**
 * GET /api/categories
 *
 * Query params:
 *   tree=true  — returns a nested tree instead of a flat array
 */
app.get("/", zValidator("query", categoryListQuerySchema), async (c) => {
	const { tree } = c.req.valid("query");
	const rows = await listCategories();
	const data = tree ? buildCategoryTree(rows) : rows;
	return c.json({ data }, HttpStatusCode.OK);
});

/**
 * GET /api/categories/:path
 *
 * `:path` is the materialized path after `/api/categories/`.
 * Examples:
 *   /api/categories/skincare            → looks up path "/skincare"
 *   /api/categories/skincare/serums     → looks up path "/skincare/serums"
 *
 * Returns the category, its direct children, and its products.
 */
app.get("/:path{.+}", zValidator("query", categoryPathQuerySchema), async (c) => {
	const slug = c.req.param("path").replace(/\/$/, "");
	const path = `/${slug}`;
	const { sort, page, limit } = c.req.valid("query");

	const category = await getCategoryByPath(path);
	if (!category) {
		return c.json({ error: "Category not found" }, HttpStatusCode.NOT_FOUND);
	}

	const [children, { products, total }] = await Promise.all([
		getCategoryChildren(category.id),
		getCategorySubtreeProducts(path, { sort, page, limit }),
	]);

	const totalPages = Math.ceil(total / limit);

	return c.json({ data: { ...category, children, products, total, page, limit, totalPages } }, HttpStatusCode.OK);
});

export default app;
