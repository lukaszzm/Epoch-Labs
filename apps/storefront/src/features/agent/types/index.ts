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

export interface CartToolResult {
	id: string;
	role: "tool_result";
	toolName: "getCart";
	data: CartData;
}

export type Message = TextMessage | CartToolResult;

export interface ToolActivity {
	id: string;
	name: string;
}

export interface SseBlock {
	eventType: string;
	data: string;
}
