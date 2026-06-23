export const ApiRoute = {
	HEALTH_CHECK: "/api/health",
	FEATURED_PRODUCTS: "/api/products",
} as const satisfies Record<string, `/api/${string}`>;

export type ApiRoute = (typeof ApiRoute)[keyof typeof ApiRoute];
