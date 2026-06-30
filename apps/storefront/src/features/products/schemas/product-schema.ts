import { z } from "zod";
import { productProjectionSchema } from "@/features/products/schemas/product-projection-schema";
import { productVariantSchema } from "@/features/products/schemas/product-variant-schema";

export const productSchema = productProjectionSchema.extend({
	categoryId: z.string(),
	description: z.string().nullish(),
	variants: z.array(productVariantSchema),
});

export type Product = z.infer<typeof productSchema>;
