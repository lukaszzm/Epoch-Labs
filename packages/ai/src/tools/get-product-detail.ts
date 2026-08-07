import { db, products, productVariants } from "@epoch-labs/db";
import { tool } from "ai";
import { and, eq } from "drizzle-orm";
import z from "zod";

export const getProductDetailTool = tool({
	description:
		"Fetch full product details including all purchasable variants (sizes, prices, stock availability) by product slug. Use this when the customer wants to see a specific product or before adding an item to the cart.",
	inputSchema: z.object({
		slug: z.string().describe("Product slug (URL-safe identifier, e.g. 'la-roche-posay-toleriane-cleanser')"),
	}),
	execute: async ({ slug }) => {
		const [product] = await db
			.select({
				id: products.id,
				name: products.name,
				slug: products.slug,
				brand: products.brand,
				shortDescription: products.shortDescription,
				agentSummary: products.agentSummary,
				categoryId: products.categoryId,
				tags: products.tags,
				attributes: products.attributes,
				lowestPriceInCents: products.lowestPriceInCents,
				currency: products.currency,
				averageRating: products.averageRating,
				reviewCount: products.reviewCount,
			})
			.from(products)
.where(and(eq(products.slug, slug), eq(products.status, "active")))
			.limit(1);

		if (!product) {
			return { found: false, product: null };
		}

		const variants = await db
			.select({
				id: productVariants.id,
				sku: productVariants.sku,
				name: productVariants.name,
				priceInCents: productVariants.priceInCents,
				compareAtPriceInCents: productVariants.compareAtPriceInCents,
				stockQuantity: productVariants.stockQuantity,
				isAvailable: productVariants.isAvailable,
				position: productVariants.position,
			})
			.from(productVariants)
			.where(eq(productVariants.productId, product.id))
			.orderBy(productVariants.position);

		return { found: true, product: { ...product, variants } };
	},
});
