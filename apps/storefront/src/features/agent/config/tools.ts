export const Tool = {
	GET_CART: "getCart",
	LIST_PRODUCTS: "listProducts",
	GET_PRODUCT_DETAIL: "getProductDetail",
	START_CHECKOUT: "startCheckout",
	ADD_TO_CART: "addToCart",
	REMOVE_FROM_CART: "removeFromCart",
} as const satisfies Record<string, string>;

export type Tool = (typeof Tool)[keyof typeof Tool];
