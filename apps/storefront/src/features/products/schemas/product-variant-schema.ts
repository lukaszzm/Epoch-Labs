import { z } from "zod";

export const productVariantSchema = z.object({
	id: z.string(),
	productId: z.string(),
	sku: z.string(),
	name: z.string(),
	priceInCents: z.number().int().nonnegative(),
	compareAtPriceInCents: z.number().int().nonnegative().nullish(),
	stockQuantity: z.number().int().nonnegative(),
	isAvailable: z.boolean(),
	position: z.number().int().nonnegative(),
	createdAt: z.string(),
	updatedAt: z.string().nullish(),
});

export type ProductVariant = z.infer<typeof productVariantSchema>;
