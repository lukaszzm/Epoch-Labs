import { z } from "zod";
import { cartItemSchema } from "@/features/cart/schemas/cart-item-schema";

export const cartSchema = z.object({
	id: z.string(),
	sessionId: z.string(),
	status: z.string(),
	userId: z.string().nullish(),
	createdAt: z.string(),
	updatedAt: z.string(),
	items: z.array(cartItemSchema),
});

export type Cart = z.infer<typeof cartSchema>;
