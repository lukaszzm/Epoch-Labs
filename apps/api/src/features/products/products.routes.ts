import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HttpStatusCode } from "@/config/http-status-code";
import { getProductBySlug, listProducts } from "@/features/products/products.queries";
import { productListQuerySchema } from "@/features/products/products.schemas";

const app = new Hono();

/**
 * GET /api/products
 *
 * Query params:
 *   page        — page number, default 1
 *   limit       — items per page, default 20, max 100
 *   category    — category ID to filter by
 *   brand       — brand name (case-insensitive)
 *   priceMin    — minimum price in cents (inclusive)
 *   priceMax    — maximum price in cents (inclusive)
 *   attributes  — JSON-encoded attribute key/value pairs to match
 */
app.get("/", zValidator("query", productListQuerySchema), async (c) => {
	const { page, limit, category, brand, priceMin, priceMax, attributes } = c.req.valid("query");

	const result = await listProducts({
		page,
		limit,
		category,
		brand,
		priceMin,
		priceMax,
		attributes,
	});

	return c.json(result, HttpStatusCode.OK);
});

/**
 * GET /api/products/:slug
 *
 * Returns full product detail including all variants.
 */
app.get("/:slug", async (c) => {
	const slug = c.req.param("slug");
	const product = await getProductBySlug(slug);

	if (!product) {
		return c.json({ error: "Product not found" }, HttpStatusCode.NOT_FOUND);
	}

	return c.json({ data: product }, HttpStatusCode.OK);
});

export default app;
