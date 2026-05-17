import type { ProductAttributeValues } from "@epoch-labs/db";

interface BuildProductTextOptions {
	name: string;
	brand: string;
	shortDescription: string;
	agentSummary: string;
	attributes: ProductAttributeValues;
}

export function buildProductText(p: BuildProductTextOptions): string {
	return `${p.name} by ${p.brand}. ${p.shortDescription} ${p.agentSummary} Attributes: ${JSON.stringify(p.attributes)}`.trim();
}
