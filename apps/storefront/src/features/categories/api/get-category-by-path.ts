import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ApiRoute } from "@/config/api-routes";
import { categoryProductSchema } from "@/features/categories/schemas/category-product-schema";
import { categorySchema } from "@/features/categories/schemas/category-schema";
import { buildApiUrl } from "@/utils/build-api-url";

const getCategoryByPathInputSchema = z.object({
	path: z.string().min(1),
});

const getCategoryByPathOutputSchema = z.object({
	data: categorySchema.extend({
		children: z.array(categorySchema),
		products: z.array(categoryProductSchema),
	}),
});

export const getCategoryByPath = createServerFn()
	.inputValidator(getCategoryByPathInputSchema)
	.handler(async ({ data: { path } }) => {
		const url = `${buildApiUrl(ApiRoute.CATEGORIES)}/${path}`;
		const response = await fetch(url);

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
