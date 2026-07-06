import z from "zod";

export const categoryListQuerySchema = z.object({
	tree: z.enum(["true", "false"]).optional().default("false"),
});

export const PRODUCT_SORT_VALUES = ["featured", "price_asc", "price_desc", "newest", "rating_desc"] as const;
export type ProductSort = (typeof PRODUCT_SORT_VALUES)[number];

export const categoryPathQuerySchema = z.object({
	sort: z.enum(PRODUCT_SORT_VALUES).optional().default("featured"),
	page: z.coerce.number().int().positive().optional().default(1),
	limit: z.coerce.number().int().positive().max(100).optional().default(20),
});

export type CategoryPathQuery = z.infer<typeof categoryPathQuerySchema>;
