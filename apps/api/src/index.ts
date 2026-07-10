import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import agentRoutes from "@/features/agent/agent.routes.js";
import cartRoutes from "@/features/cart/cart.routes.js";
import categoriesRoutes from "@/features/categories/categories.routes.js";
import checkoutRoutes from "@/features/checkout/checkout.routes.js";
import productsRoutes from "@/features/products/products.routes.js";

const api = new Hono().basePath("/api");

api.use(logger());
api.use(cors({ origin: process.env.STOREFRONT_URL ?? "http://localhost:5173" }));

api.get("/health", (c) => c.json({ status: "ok" }));

api.route("/categories", categoriesRoutes);
api.route("/products", productsRoutes);
api.route("/cart", cartRoutes);
api.route("/checkout", checkoutRoutes);
api.route("/agent", agentRoutes);

serve(
	{
		fetch: api.fetch,
		port: 5174,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
