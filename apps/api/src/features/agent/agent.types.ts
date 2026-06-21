/**
 * Discriminated union for SSE event payloads streamed back to the client.
 */
export type SseEvent =
	| { type: "text"; chunk: string }
	| { type: "tool_call"; name: string; input: Record<string, unknown> }
	| { type: "tool_result"; toolCallId: string; content: string }
	| { type: "done"; conversationId: string };
