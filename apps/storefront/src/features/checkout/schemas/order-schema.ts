import { z } from "zod";

const variantSnapshotSchema = z.object({
	sku: z.string(),
	name: z.string(),
	productName: z.string(),
	brand: z.string(),
	imageUrl: z.string().optional(),
});

export const orderItemSchema = z.object({
	id: z.string(),
	quantity: z.number(),
	priceInCents: z.number(),
	variantSnapshot: variantSnapshotSchema,
});

export const orderSchema = z.object({
	id: z.string(),
	cartId: z.string().nullable(),
	totalInCents: z.number(),
	currency: z.string(),
	status: z.enum(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"]),
	createdAt: z.string(),
	items: z.array(orderItemSchema).nonempty(),
});

export type Order = z.infer<typeof orderSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;

export type OrderStatus = Order["status"];
