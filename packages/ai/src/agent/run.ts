import { SYSTEM_PROMPT } from "@ai/agent/system-prompt";
import { buildToolsRegistry } from "@ai/agent/tools-registry";
import { geminiLanguage } from "@ai/lib/gemini";
import type { Message } from "@epoch-labs/db";
import type { ModelMessage } from "ai";
import { stepCountIs, streamText } from "ai";

export type SseEvent =
	| { type: "text"; chunk: string }
	| { type: "tool_call"; toolCallId: string; toolName: string; input: Record<string, unknown> }
	| { type: "tool_result"; toolCallId: string; toolName: string; content: string }
	| { type: "done"; conversationId: string };

/**
 * Converts stored DB messages to the format expected by the AI SDK.
 *
 * Tool call history reconstruction (pairing assistant tool-call parts with their
 * tool result turns) is intentionally deferred. For now, only the text portions of
 * user and assistant turns are replayed so the model retains conversational context
 * without receiving malformed history.
 */
function toModelMessages(history: ReadonlyArray<Message>): ModelMessage[] {
	const messages: ModelMessage[] = [];

	for (const msg of history) {
		if (msg.role === "user") {
			messages.push({ role: "user", content: msg.content });
		} else if (msg.role === "assistant" && msg.content) {
			messages.push({ role: "assistant", content: msg.content });
		}
		// 'tool' messages omitted — see note above
	}

	return messages;
}

/**
 * Runs the shopping agent for a single customer turn and yields SSE events.
 *
 * @example
 * ```ts
 * for await (const event of runAgent({ sessionId, conversationId, history })) {
 *   await stream.writeSSE({ event: event.type, data: JSON.stringify(event) });
 * }
 * ```
 */
export async function* runAgent(params: {
	sessionId: string;
	conversationId: string;
	history: Message[];
}): AsyncGenerator<SseEvent> {
	const messages = toModelMessages(params.history);
	const tools = buildToolsRegistry(params.sessionId);

	const result = streamText({
		model: geminiLanguage,
		system: SYSTEM_PROMPT,
		messages,
		tools,
		stopWhen: stepCountIs(5),
	});

	for await (const part of result.fullStream) {
		switch (part.type) {
			case "text-delta":
				if (part.text) {
					yield { type: "text", chunk: part.text };
				}
				break;

			case "tool-call":
				yield {
					type: "tool_call",
					toolCallId: part.toolCallId,
					toolName: part.toolName,
					input: part.input as Record<string, unknown>,
				};
				break;

			case "tool-result":
				yield {
					type: "tool_result",
					toolCallId: part.toolCallId,
					toolName: part.toolName,
					content: JSON.stringify(part.output),
				};
				break;

			case "error":
				throw part.error;

			// step-start, step-finish, finish, reasoning, etc. are intentionally ignored
		}
	}

	yield { type: "done", conversationId: params.conversationId };
}
