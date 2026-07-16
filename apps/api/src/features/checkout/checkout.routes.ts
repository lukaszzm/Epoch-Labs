import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { HttpStatusCode } from "@/config/http-status-code";
import { convertCartToOrder, getOrderById } from "@/features/checkout/checkout.queries";
import { checkoutBodySchema } from "@/features/checkout/checkout.schemas";

const app = new Hono();

/**
 * GET /api/checkout/:id
 *
 * Returns a single order by ID.
 * Returns 404 if no order with that ID exists.
 */
app.get("/:id", zValidator("param", z.object({ id: z.string().min(1) })), async (c) => {
	const { id } = c.req.valid("param");
	const order = await getOrderById(id);

	if (!order) {
		return c.json({ error: "Order not found" }, HttpStatusCode.NOT_FOUND);
	}

	return c.json({ data: order }, HttpStatusCode.OK);
});

/**
 * POST /api/checkout
 *
 * Converts an active cart into a pending order.
 * The cart status is set to "converted" and becomes read-only.
 * Returns 404 if the session has no active cart.
 * Returns 422 if the cart is empty.
 */
app.post("/", zValidator("json", checkoutBodySchema), async (c) => {
	const { sessionId, shippingAddress, currency } = c.req.valid("json");

	const result = await convertCartToOrder(sessionId, shippingAddress, currency);

	if (!result.cart) {
		return c.json({ error: "Cart not found" }, HttpStatusCode.NOT_FOUND);
	}

	if (!result.order) {
		return c.json({ error: "Cart is empty" }, HttpStatusCode.UNPROCESSABLE_ENTITY);
	}

	return c.json({ data: result.order }, HttpStatusCode.CREATED);
});

export default app;
