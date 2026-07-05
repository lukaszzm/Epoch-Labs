import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ApiRoute } from "@/config/api-routes";
import { categoryNodeSchema } from "@/features/categories/schemas/category-node-schema";
import { buildApiUrl } from "@/utils/build-api-url";

const getCategoryTreeOutputSchema = z.object({
	data: z.array(categoryNodeSchema),
});

export const getCategoryTree = createServerFn().handler(async () => {
	const url = buildApiUrl(ApiRoute.CATEGORIES, { tree: true });
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to fetch categories: ${response.statusText}`);
	}

	const json = await response.json();
	const parsed = getCategoryTreeOutputSchema.safeParse(json);

	if (!parsed.success) {
		throw new Error(`Invalid response format: ${parsed.error.message}`);
	}

	return parsed.data.data.at(0);
});
