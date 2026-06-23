import { z } from "zod";
import { productImageSchema } from "@/features/products/schemas/product-image-schema";

export const productSchema = z.object({
	id: z.string(),
	categoryId: z.string(),
	name: z.string(),
	slug: z.string(),
	brand: z.string(),
	shortDescription: z.string().optional(),
	isFeatured: z.boolean(),
	images: z.array(productImageSchema).optional(),
	lowestPriceInCents: z.number().int().nonnegative(),
	currency: z.string().length(3),
	averageRating: z.number().min(0).max(5).optional(),
	reviewCount: z.number().int().nonnegative().optional(),
	position: z.number().int().nonnegative(),
	createdAt: z.string(),
	updatedAt: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;
