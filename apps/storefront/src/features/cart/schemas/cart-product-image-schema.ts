import { z } from "zod";

export const cartProductImageSchema = z.object({
	url: z.string(),
	alt: z.string().optional(),
	isPrimary: z.boolean().optional(),
	displayOrder: z.number().optional(),
});

export type CartProductImage = z.infer<typeof cartProductImageSchema>;
