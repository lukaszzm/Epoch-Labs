import { geminiLanguage } from "@ai/lib/gemini";
import type { UserInputs } from "@ai/utils/collect-user-inputs";
import type { CategoryContext } from "@ai/utils/fetch-category-context";
import { generateObject } from "ai";
import z from "zod";

const variantSchema = z.object({
	name: z.string().describe("Human-readable size label, e.g. '30ml', '100ml Travel Size'"),
	sku: z.string().describe("Globally unique SKU using BRAND-CODE-SIZE convention"),
	priceInCents: z.number().int().positive().describe("Price in cents, e.g. 1499 for $14.99"),
	compareAtPriceInCents: z
		.number()
		.int()
		.positive()
		.nullable()
		.describe("Original price before discount, null if not on sale"),
	stockQuantity: z.number().int().min(0).describe("Units in stock"),
});

const generatedProductSchema = z.object({
	slug: z.string().describe("URL-safe slug: brand-slug + product-name-slug, globally unique"),
	shortDescription: z.string().max(160).describe("1–2 sentence summary, max 160 characters"),
	description: z.string().describe("Full product description in plain text, 3–6 sentences"),
	agentSummary: z
		.string()
		.describe("Concise prose summary for the AI agent: name, brand, skin type, key ingredients, sizes, price range"),
	tags: z.array(z.string()).describe("5–10 relevant tags for filtering and agent hints"),
	attributes: z
		.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]))
		.describe("Product attribute values matching the category attribute keys"),
	seoTitle: z.string().max(60).describe("SEO title tag, max 60 characters"),
	seoDescription: z.string().max(160).describe("Meta description, max 160 characters"),
	isFeatured: z.boolean().describe("Whether this product should be featured"),
	variants: z.array(variantSchema).min(1).describe("At least one purchasable variant (size/price)"),
});

export type GeneratedProduct = z.infer<typeof generatedProductSchema>;

export async function generateProductContent(inputs: UserInputs, category: CategoryContext): Promise<GeneratedProduct> {
	const attributeGuide =
		category.attributes.length > 0
			? `\nCategory attribute schema (you must populate these keys in the attributes object):\n${JSON.stringify(category.attributes, null, 2)}`
			: "\nNo predefined attributes for this category.";

	const prompt = `You are an expert e-commerce product catalog manager for a cosmetics / skincare brand platform.

Generate a complete, compelling product listing for:
- Product name: ${inputs.name}
- Brand: ${inputs.brand}
- Category: ${category.name} — ${category.description}
${inputs.notes ? `- Additional context from user: ${inputs.notes}` : ""}
${attributeGuide}

Rules:
- The slug must follow the pattern: "<brand-slug>-<product-name-slug>" (e.g. "la-roche-posay-toleriane-cleanser")
- All attribute keys in the attributes object must exactly match the keys defined in the category attribute schema above
- For enum/multi-enum attributes, only use values from the options list
- Generate realistic 1–3 variants (sizes/formats) with sensible USD prices for a cosmetics product
- SKU convention: "<BRAND_CODE>-<PRODUCT_CODE>-<SIZE>" using uppercase abbreviations
- isFeatured should be false unless the product is exceptional
- Keep agentSummary under 200 characters`;

	const { object } = await generateObject({
		model: geminiLanguage,
		schema: generatedProductSchema,
		prompt,
	});

	return object;
}
