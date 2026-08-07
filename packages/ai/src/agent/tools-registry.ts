import { buildAddToCartTool } from "@ai/tools/add-to-cart";
import { buildGetCartTool } from "@ai/tools/get-cart";
import { getProductDetailTool } from "@ai/tools/get-product-detail";
import { listProductsTool } from "@ai/tools/list-products";
import { buildRemoveFromCartTool } from "@ai/tools/remove-from-cart";
import { searchCategoriesTool } from "@ai/tools/search-categories";
import { searchProductsTool } from "@ai/tools/search-products";
import { buildStartCheckoutTool } from "@ai/tools/start-checkout";

export function buildToolsRegistry(sessionId: string) {
	return {
		searchCategories: searchCategoriesTool,
		searchProducts: searchProductsTool,
		listProducts: listProductsTool,
		getProductDetail: getProductDetailTool,
		addToCart: buildAddToCartTool(sessionId),
		getCart: buildGetCartTool(sessionId),
		removeFromCart: buildRemoveFromCartTool(sessionId),
		startCheckout: buildStartCheckoutTool(sessionId),
	};
}

export type ToolsRegistry = ReturnType<typeof buildToolsRegistry>;
