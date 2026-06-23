import z from "zod";

export const paginationSchema = z.object({
	total: z.number().int().nonnegative(),
	page: z.number().int().nonnegative(),
	limit: z.number().int().positive(),
	totalPages: z.number().int().nonnegative(),
});

export type PaginationMeta = z.infer<typeof paginationSchema>;
