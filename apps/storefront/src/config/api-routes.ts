export const ApiRoute = {
	HEALTH_CHECK: "/api/health",
	FEATURED_PRODUCTS: "/api/products",
	PRODUCT: "/api/products",
	CATEGORIES: "/api/categories",
	CART: "/api/cart",
	CHECKOUT: "/api/checkout",
	AGENT_CHAT: "/api/agent/chat",
} as const satisfies Record<string, `/api/${string}`>;

export type ApiRoute = (typeof ApiRoute)[keyof typeof ApiRoute];
