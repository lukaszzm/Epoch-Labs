import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HttpStatusCode } from "@/config/http-status-code";
import { convertCartToOrder } from "@/features/checkout/checkout.queries";
import { checkoutBodySchema } from "@/features/checkout/checkout.schemas";

const app = new Hono();

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
