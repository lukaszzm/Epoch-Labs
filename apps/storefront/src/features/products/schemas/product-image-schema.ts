import { z } from "zod";

export const productImageSchema = z.object({
	url: z.url(),
	alt: z.string().optional(),
	isPrimary: z.boolean().optional(),
	displayOrder: z.number().int().nonnegative().optional(),
});

export type ProductImage = z.infer<typeof productImageSchema>;
