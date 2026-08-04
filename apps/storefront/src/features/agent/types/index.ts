import type { SseEvent, SseEventType } from "@/features/agent/schemas/sse-event-schema";

export type { SseEvent, SseEventType };

export type ChatRole = "user" | "assistant";

export interface Message {
	id: string;
	role: ChatRole;
	content: string;
}

export interface ToolActivity {
	id: string;
	name: string;
}

export interface SseBlock {
	eventType: string;
	data: string;
}
