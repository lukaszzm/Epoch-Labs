import type { SseEvent, SseEventType } from "@/features/agent/schemas/sse-event-schema";

export type { SseEvent, SseEventType };

export type ChatRole = "user" | "assistant";

export interface TextMessage {
	id: string;
	role: ChatRole;
	content: string;
}

export interface CartItem {
	id: string;
	quantity: number;
	priceSnapshot: number;
	lineTotalInCents: number;
	variant: { name: string };
	product: { name: string; slug: string };
}

export interface CartData {
	cartId: string | null;
	items: CartItem[];
	totalInCents: number;
	currency: string;
	itemCount: number;
}

export interface GetCartToolResult {
	id: string;
	role: "tool_result";
	toolName: "getCart";
	data: CartData;
}

export interface AgentProduct {
	id: string;
	name: string;
	slug: string;
	brand: string;
	shortDescription: string;
	lowestPriceInCents: number | null;
	currency: string;
	averageRating: number;
	reviewCount: number;
}

export interface AgentProductVariant {
	id: string;
	sku: string;
	name: string;
	priceInCents: number;
	compareAtPriceInCents: number | null;
	stockQuantity: number;
	isAvailable: boolean;
}

export interface AgentProductDetail extends AgentProduct {
	categoryId: string;
	tags: string[];
	attributes: Record<string, string | number | boolean | string[]>;
	variants: AgentProductVariant[];
}

export interface ListProductsToolResult {
	id: string;
	role: "tool_result";
	toolName: "listProducts";
	products: AgentProduct[];
}

export interface GetProductDetailToolResult {
	id: string;
	role: "tool_result";
	toolName: "getProductDetail";
	product: AgentProductDetail;
}

export interface OrderLineItem {
	variantId: string;
	sku: string;
	variantName: string;
	productName: string;
	brand: string;
	quantity: number;
	priceInCents: number;
	lineTotalInCents: number;
}

export interface OrderData {
	id: string;
	status: string;
	totalInCents: number;
	currency: string;
	itemCount: number;
	lineItems: OrderLineItem[];
}

export interface StartCheckoutToolResult {
	id: string;
	role: "tool_result";
	toolName: "startCheckout";
	order: OrderData;
}

export type ToolResult =
	| GetCartToolResult
	| ListProductsToolResult
	| GetProductDetailToolResult
	| StartCheckoutToolResult;

export type Message = TextMessage | ToolResult;

export interface ToolActivity {
	id: string;
	name: string;
}

export interface SseBlock {
	eventType: string;
	data: string;
}
