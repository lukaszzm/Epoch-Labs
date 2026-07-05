import { z } from "zod";
import { productProjectionSchema } from "@/features/products/schemas/product-projection-schema";

export const categoryProductSchema = productProjectionSchema.extend({
	createdAt: z.string().default(""),
	updatedAt: z.string().nullish(),
});

export type CategoryProductProjection = z.infer<typeof categoryProductSchema>;
