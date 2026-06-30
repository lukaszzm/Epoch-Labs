import { z } from "zod";
import { productImageSchema } from "@/features/products/schemas/product-image-schema";

export const productProjectionSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	brand: z.string(),
	shortDescription: z.string().nullish(),
	images: z.array(productImageSchema).nullish(),
	isFeatured: z.boolean(),
	lowestPriceInCents: z.number().int().nonnegative(),
	currency: z.string().length(3),
	averageRating: z.number().min(0).max(5).nullish(),
	reviewCount: z.number().int().nonnegative().nullish(),
	position: z.number().int().nonnegative(),
	createdAt: z.string(),
	updatedAt: z.string().nullish(),
});

export type ProductProjection = z.infer<typeof productProjectionSchema>;
