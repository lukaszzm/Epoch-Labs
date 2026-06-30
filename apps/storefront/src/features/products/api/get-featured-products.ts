import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ApiRoute } from "@/config/api-routes";
import { productProjectionSchema } from "@/features/products/schemas/product-projection-schema";
import { paginationSchema } from "@/schemas/pagination-schema";
import { buildApiUrl } from "@/utils/build-api-url";

const getFeaturedProductsInputSchema = z.object({
	limit: z.number().int().positive().max(100),
});

const getFeaturedProductsOutputSchema = z.object({
	results: z.array(productProjectionSchema),
	pagination: paginationSchema,
});

export const getFeaturedProducts = createServerFn()
	.inputValidator(getFeaturedProductsInputSchema)
	.handler(async ({ data: { limit } }) => {
		const url = buildApiUrl(ApiRoute.FEATURED_PRODUCTS, { limit, featured: true });
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch featured products: ${response.statusText}`);
		}

		const data = await response.json();
		const parsed = getFeaturedProductsOutputSchema.safeParse(data);

		if (!parsed.success) {
			throw new Error(`Invalid response format: ${parsed.error.message}`);
		}

		return parsed.data;
	});
