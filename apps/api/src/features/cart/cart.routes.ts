import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createCart, getCartBySessionId, patchCartItems } from "@/features/cart/cart.queries";
import { createCartBodySchema, patchCartItemsBodySchema } from "@/features/cart/cart.schemas";

const app = new Hono();

/**
 * POST /api/cart
 *
 * Creates a new active cart for a browser session.
 */
app.post("/", zValidator("json", createCartBodySchema), async (c) => {
	const { sessionId, userId } = c.req.valid("json");
	const cart = await createCart(sessionId, userId);
	return c.json({ data: cart }, 201);
});

/**
 * GET /api/cart/:sessionId
 *
 * Returns the active cart and its enriched line items for the given session.
 */
app.get("/:sessionId", async (c) => {
	const sessionId = c.req.param("sessionId");
	const cart = await getCartBySessionId(sessionId);

	if (!cart) {
		return c.json({ error: "Cart not found" }, 404);
	}

	return c.json({ data: cart });
});

/**
 * PATCH /api/cart/:sessionId/items
 *
 * Batch-update line items for the active cart.
 * quantity = 0 removes the item; quantity > 0 upserts it.
 */
app.patch("/:sessionId/items", zValidator("json", patchCartItemsBodySchema), async (c) => {
	const sessionId = c.req.param("sessionId");
	const { items } = c.req.valid("json");

	const cart = await getCartBySessionId(sessionId);
	if (!cart) {
		return c.json({ error: "Cart not found" }, 404);
	}

	await patchCartItems(cart.id, items);

	const updated = await getCartBySessionId(sessionId);
	return c.json({ data: updated });
});

export default app;
