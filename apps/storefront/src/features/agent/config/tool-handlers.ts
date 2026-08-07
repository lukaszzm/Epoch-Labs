import type { Tool } from "@/features/agent/config/tools";
import {
	addToCartPayloadSchema,
	getCartPayloadSchema,
	getProductDetailPayloadSchema,
	listProductsPayloadSchema,
	removeFromCartPayloadSchema,
	startCheckoutPayloadSchema,
} from "@/features/agent/schemas/tool-result-schemas";
import type { ToolResult } from "@/features/agent/types";

type ToolHandlerFn = (raw: unknown) => ToolResult | null;

export const ToolHandler = {
	getCart(raw) {
		const parsed = getCartPayloadSchema.safeParse(raw);

		if (!parsed.success) {
			return null;
		}

		return { id: crypto.randomUUID(), role: "tool_result", toolName: "getCart", data: parsed.data };
	},

	listProducts(raw) {
		const parsed = listProductsPayloadSchema.safeParse(raw);

		if (!parsed.success || parsed.data.data.length === 0) {
			return null;
		}

		return { id: crypto.randomUUID(), role: "tool_result", toolName: "listProducts", products: parsed.data.data };
	},

	getProductDetail(raw) {
		const parsed = getProductDetailPayloadSchema.safeParse(raw);

		if (!parsed.success) {
			return null;
		}

		return { id: crypto.randomUUID(), role: "tool_result", toolName: "getProductDetail", product: parsed.data.product };
	},

	startCheckout(raw) {
		const parsed = startCheckoutPayloadSchema.safeParse(raw);

		if (!parsed.success) {
			return null;
		}

		return { id: crypto.randomUUID(), role: "tool_result", toolName: "startCheckout", order: parsed.data.order };
	},

	addToCart(raw) {
		const parsed = addToCartPayloadSchema.safeParse(raw);

		if (!parsed.success) {
			return null;
		}

		return { id: crypto.randomUUID(), role: "tool_result", toolName: "addToCart", ...parsed.data.added };
	},

	removeFromCart(raw) {
		const parsed = removeFromCartPayloadSchema.safeParse(raw);

		if (!parsed.success) {
			return null;
		}

		const { action, variantName, productName, currency, newQuantity } = parsed.data;

		return {
			id: crypto.randomUUID(),
			role: "tool_result",
			toolName: "removeFromCart",
			action,
			variantName,
			productName,
			currency: currency ?? "USD",
			newQuantity,
		};
	},
} as const satisfies Record<Tool, ToolHandlerFn>;
