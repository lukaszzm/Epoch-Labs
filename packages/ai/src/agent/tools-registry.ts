import { tool } from "ai";
import { z } from "zod";

export function buildToolsRegistry(_sessionId: string) {
	return {
		/**
		 * Semantic vector search across the active product catalog.
		 */
		searchProducts: tool({
			description:
				"Search the product catalog using natural language. Returns the most semantically relevant active products. Use optional filters to narrow by price, brand, or category.",
			inputSchema: z.object({
				query: z.string().describe("Natural language search query (e.g. 'gentle face wash for dry skin')"),
			}),
			execute: async ({ query }) => {
				return { products: [{ name: `My cool product ${query}` }] };
			},
		}),
	};
}

export type ToolsRegistry = ReturnType<typeof buildToolsRegistry>;
