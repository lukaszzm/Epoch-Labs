import { serve } from "@hono/node-server";
import { Hono } from "hono";

const api = new Hono().basePath("/api");

api.get("/health", (c) => {
	return c.json({ status: "ok" });
});

serve(
	{
		fetch: api.fetch,
		port: 5174,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
