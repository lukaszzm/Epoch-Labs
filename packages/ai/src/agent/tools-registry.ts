import { buildAddToCartTool } from "@ai/tools/add-to-cart";
import { buildGetCartTool } from "@ai/tools/get-cart";
import { getProductDetailTool } from "@ai/tools/get-product-detail";
import { getProductVariantsTool } from "@ai/tools/get-product-variants";
import { listProductsTool } from "@ai/tools/list-products";
import { buildRemoveFromCartTool } from "@ai/tools/remove-from-cart";
import { searchCategoriesTool } from "@ai/tools/search-categories";
import { searchProductsTool } from "@ai/tools/search-products";
import { buildStartCheckoutTool } from "@ai/tools/start-checkout";

export function buildToolsRegistry(sessionId: string) {
	return {
		// Customer-facing tools - rendered in the storefront UI
		listProducts: listProductsTool,
		getProductDetail: getProductDetailTool,
		getCart: buildGetCartTool(sessionId),
		addToCart: buildAddToCartTool(sessionId),
		removeFromCart: buildRemoveFromCartTool(sessionId),
		startCheckout: buildStartCheckoutTool(sessionId),
		// Internal lookup tools - not rendered in the storefront UI
		searchCategories: searchCategoriesTool,
		searchProducts: searchProductsTool,
		getProductVariants: getProductVariantsTool,
	};
}

export type ToolsRegistry = ReturnType<typeof buildToolsRegistry>;
