import { db, products, productVariants } from "@epoch-labs/db";
import { tool } from "ai";
import { and, eq } from "drizzle-orm";
import z from "zod";

export const getProductVariantsTool = tool({
	description:
		"Internal tool: fetch purchasable variants (IDs, names, prices, stock) for a product by slug. Use this to resolve a productVariantId before calling addToCart. Do NOT use this when the customer asks to see product details — use getProductDetail for that.",
	inputSchema: z.object({
		slug: z.string().describe("Product slug (URL-safe identifier, e.g. 'la-roche-posay-toleriane-cleanser')"),
	}),
	execute: async ({ slug }) => {
		const [product] = await db
			.select({ id: products.id, name: products.name })
			.from(products)
			.where(and(eq(products.slug, slug), eq(products.status, "active")))
			.limit(1);

		if (!product) {
			return { found: false, productId: null, productName: null, variants: [] };
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

		return { found: true, productId: product.id, productName: product.name, variants };
	},
});
