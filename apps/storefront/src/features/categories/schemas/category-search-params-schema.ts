import { z } from "zod";
import { DEFAULT_SORT_OPTION, SORT_OPTIONS } from "@/features/categories/config/sort-options";

export const categorySearchParamsSchema = z.object({
	page: z.number().int().positive().default(1).catch(1),
	sort: z.enum(SORT_OPTIONS).default(DEFAULT_SORT_OPTION).catch(DEFAULT_SORT_OPTION),
});

export type CategorySearchParams = z.infer<typeof categorySearchParamsSchema>;
