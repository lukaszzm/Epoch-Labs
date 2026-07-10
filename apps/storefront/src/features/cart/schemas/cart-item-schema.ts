import { z } from "zod";
import { cartProductImageSchema } from "@/features/cart/schemas/cart-product-image-schema";

export const cartItemSchema = z.object({
	id: z.string(),
	productVariantId: z.string(),
	quantity: z.number().int(),
	priceSnapshot: z.number().int(),
	addedAt: z.string(),
	variant: z.object({
		sku: z.string(),
		name: z.string(),
		priceInCents: z.number().int(),
		isAvailable: z.boolean(),
	}),
	product: z.object({
		id: z.string(),
		name: z.string(),
		brand: z.string(),
		slug: z.string(),
		images: z.array(cartProductImageSchema).nullish(),
	}),
});

export type CartItem = z.infer<typeof cartItemSchema>;
