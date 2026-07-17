import { z } from "zod";

export const createCartBodySchema = z.object({
	sessionId: z.string().min(1),
	userId: z.string().min(1).optional(),
});

export const cartItemSchema = z.object({
	variantId: z.string().min(1),
	/**
	 * New quantity for this item.
	 * 0 or less means "remove from cart"; positive means "add/update in cart".
	 */
	quantity: z.number().int().min(0),
});

export const patchCartItemsBodySchema = z.object({
	items: z.array(cartItemSchema).min(1),
	/**
	 * "accumulate" accumulates quantity on top of any existing value.
	 * "replace" replaces the quantity with the new value (default).
	 */
	mode: z.enum(["accumulate", "replace"]).default("replace"),
});
