import { z } from "zod";

type ProductAttributeValues = Record<
	string,
	string | number | boolean | string[]
>;

const positiveInt = z.coerce.number().int().positive();

export const productListQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	category: z.string().min(1).optional(),
	brand: z.string().min(1).optional(),
	priceMin: positiveInt.optional(),
	priceMax: positiveInt.optional(),
	/**
	 * JSON string — parsed into ProductAttributeValues.
	 * e.g. {"skin_type":"dry","spf":30}
	 */
	attributes: z
		.string()
		.optional()
		.transform((val, ctx) => {
			if (val === undefined) {
				return undefined;
			}

			try {
				return JSON.parse(val) as ProductAttributeValues;
			} catch {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "product attributes must be valid JSON",
				});
				return z.NEVER;
			}
		}),
});
