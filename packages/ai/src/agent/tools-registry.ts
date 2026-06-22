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
		/**
		 * Semantic vector search on categories.embedding + keyword fallback.
		 */
		searchCategories: searchCategoriesTool,
		/**
		 * Semantic vector search on products.embedding + keyword fallback. Use optional filters to narrow by price, brand, or category.
		 */
		searchProducts: searchProductsTool,
		/**
		 * Structured filtering on products table. Use for category browsing, brand pages, or attribute-based filtering. For free-form natural-language queries prefer searchProducts instead.
		 */
		listProducts: listProductsTool,
		/**
		 * Fetch full product + variants by slug.
		 */
		getProductDetail: getProductDetailTool,
		/**
		 * Add a productVariantId + quantity to cart.
		 */
		addToCart: buildAddToCartTool(sessionId),
		/**
		 * Retrieve current cart items with price totals.
		 */
		getCart: buildGetCartTool(sessionId),
		/**
		 * Remove or reduce a cart item.
		 */
		removeFromCart: buildRemoveFromCartTool(sessionId),
		/**
		 * Validate cart, create order record, return order summary.
		 */
		startCheckout: buildStartCheckoutTool(sessionId),
	};
}

export type ToolsRegistry = ReturnType<typeof buildToolsRegistry>;
