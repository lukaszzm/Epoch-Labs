import type { LinkProps } from "@tanstack/react-router";

export const AppRoute = {
	HOME: "/",
	CATEGORY: "/categories/$",
	PRODUCT: "/products/$slug",
	AGENT: "/agent",
} as const satisfies Record<string, LinkProps["to"]>;

export type AppRoute = (typeof AppRoute)[keyof typeof AppRoute];
