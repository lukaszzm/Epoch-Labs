import { z } from "zod";

export const sseTextEventSchema = z.object({
	type: z.literal("text"),
	chunk: z.string(),
});

export const sseToolCallEventSchema = z.object({
	type: z.literal("tool_call"),
	name: z.string(),
	input: z.record(z.string(), z.unknown()),
});

export const sseToolResultEventSchema = z.object({
	type: z.literal("tool_result"),
	toolCallId: z.string(),
	content: z.string(),
});

export const sseDoneEventSchema = z.object({
	type: z.literal("done"),
	conversationId: z.string(),
});

export const sseEventSchema = z.discriminatedUnion("type", [
	sseTextEventSchema,
	sseToolCallEventSchema,
	sseToolResultEventSchema,
	sseDoneEventSchema,
]);

export type SseEvent = z.infer<typeof sseEventSchema>;
export type SseEventType = SseEvent["type"];
