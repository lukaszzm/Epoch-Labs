import { z } from "zod";

export const checkoutOrderSchema = z.object({
	id: z.string(),
	cartId: z.string().nullable(),
	totalInCents: z.number(),
	currency: z.string(),
	status: z.enum(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"]),
	createdAt: z.string(),
});

export type CheckoutOrder = z.infer<typeof checkoutOrderSchema>;
