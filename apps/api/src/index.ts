import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import categoriesRoutes from "@/features/categories/categories.routes.js";
import productsRoutes from "@/features/products/products.routes.js";

const api = new Hono().basePath("/api");

api.use(logger());

api.get("/health", (c) => {
	return c.json({ status: "ok" });
});

api.route("/categories", categoriesRoutes);
api.route("/products", productsRoutes);

serve(
	{
		fetch: api.fetch,
		port: 5174,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
