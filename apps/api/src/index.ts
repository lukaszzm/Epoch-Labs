import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import cartRoutes from "@/features/cart/cart.routes.js";
import categoriesRoutes from "@/features/categories/categories.routes.js";
import checkoutRoutes from "@/features/checkout/checkout.routes.js";
import productsRoutes from "@/features/products/products.routes.js";

const api = new Hono().basePath("/api");

api.use(logger());

api.get("/health", (c) => {
	return c.json({ status: "ok" });
});

api.route("/categories", categoriesRoutes);
api.route("/products", productsRoutes);
api.route("/cart", cartRoutes);
api.route("/checkout", checkoutRoutes);

serve(
	{
		fetch: api.fetch,
		port: 5174,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
