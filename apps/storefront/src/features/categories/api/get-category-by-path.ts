import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ApiRoute } from "@/config/api-routes";
import { SORT_OPTIONS } from "@/features/categories/config/sort-options";
import { categoryProductSchema } from "@/features/categories/schemas/category-product-schema";
import { categorySchema } from "@/features/categories/schemas/category-schema";
import { buildApiUrl } from "@/utils/build-api-url";

const getCategoryByPathInputSchema = z.object({
	path: z.string().min(1),
	sort: z.enum(SORT_OPTIONS).optional().default("featured"),
	page: z.number().int().positive().optional().default(1),
});

const getCategoryByPathOutputSchema = z.object({
	data: categorySchema.extend({
		children: z.array(categorySchema),
		products: z.array(categoryProductSchema),
		total: z.number().int().nonnegative(),
		page: z.number().int().positive(),
		limit: z.number().int().positive(),
		totalPages: z.number().int().nonnegative(),
	}),
});

export const getCategoryByPath = createServerFn()
	.inputValidator(getCategoryByPathInputSchema)
	.handler(async ({ data: { path, sort, page } }) => {
		const url = new URL(`${buildApiUrl(ApiRoute.CATEGORIES)}/${path}`);
		url.searchParams.set("sort", sort);
		url.searchParams.set("page", String(page));

		const response = await fetch(url.toString());

		if (response.status === 404) {
			return null;
		}

		if (!response.ok) {
			throw new Error(`Failed to fetch category: ${response.statusText}`);
		}

		const json = await response.json();
		const parsed = getCategoryByPathOutputSchema.safeParse(json);

		if (!parsed.success) {
			throw new Error(`Invalid response format: ${parsed.error.message}`);
		}

		return parsed.data.data;
	});
