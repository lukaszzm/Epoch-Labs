import type { UserInputs } from "@ai/utils/collect-user-inputs";
import { formatPrice } from "@ai/utils/format-price";
import type { GeneratedProduct } from "@ai/utils/generate-product-content";
import { printSeparator } from "@ai/utils/print-separator";
import type { ProductImage } from "@epoch-labs/db";

export function printProductPreview(
	inputs: UserInputs,
	generated: GeneratedProduct,
	image: ProductImage,
	categoryName: string,
): void {
	printSeparator();
	console.log("Product Preview - review before saving\n");
	console.log(`  Name:           ${inputs.name}`);
	console.log(`  Brand:          ${inputs.brand}`);
	console.log(`  Category:       ${categoryName} (${inputs.categoryId})`);
	console.log(`  Slug:           ${generated.slug}`);
	console.log(`  Featured:       ${generated.isFeatured}`);
	console.log(`\n  Short Desc:     ${generated.shortDescription}`);
	console.log(`\n  Description:\n    ${generated.description.replace(/\n/g, "\n    ")}`);
	console.log(`\n  Agent Summary:  ${generated.agentSummary}`);
	console.log(`\n  SEO Title:      ${generated.seoTitle}`);
	console.log(`  SEO Desc:       ${generated.seoDescription}`);
	console.log(`\n  Tags:           ${generated.tags.join(", ")}`);
	console.log(`\n  Attributes:\n    ${JSON.stringify(generated.attributes, null, 2).replace(/\n/g, "\n    ")}`);
	console.log("\n  Variants:");

	for (const v of generated.variants) {
		const compareAt = v.compareAtPriceInCents ? ` (was ${formatPrice(v.compareAtPriceInCents)})` : "";
		console.log(
			`    • ${v.name} - ${formatPrice(v.priceInCents)}${compareAt}  SKU: ${v.sku}  Stock: ${v.stockQuantity}`,
		);
	}

	console.log(`\n  Image:          ${image.url.slice(0, 60)}... [base64 truncated]`);
	printSeparator();
}
