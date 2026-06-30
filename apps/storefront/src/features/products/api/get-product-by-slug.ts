import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ApiRoute } from "@/config/api-routes";
import { productSchema } from "@/features/products/schemas/product-schema";
import { buildApiUrl } from "@/utils/build-api-url";

const getProductBySlugInputSchema = z.object({
	slug: z.string().min(1),
});

const getProductBySlugOutputSchema = z.object({
	data: productSchema,
});

export const getProductBySlug = createServerFn()
	.inputValidator(getProductBySlugInputSchema)
	.handler(async ({ data: { slug } }) => {
		const url = `${buildApiUrl(ApiRoute.PRODUCT)}/${encodeURIComponent(slug)}`;
		const response = await fetch(url);

		if (response.status === 404) {
			return null;
		}

		if (!response.ok) {
			throw new Error(`Failed to fetch product: ${response.statusText}`);
		}

		const json = await response.json();
		const parsed = getProductBySlugOutputSchema.safeParse(json);

		if (!parsed.success) {
			throw new Error(`Invalid response format: ${parsed.error.message}`);
		}

		return parsed.data.data;
	});
