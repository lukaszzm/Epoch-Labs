import { runAgent } from "@epoch-labs/ai";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { HttpStatusCode } from "@/config/http-status-code";
import {
	createConversation,
	getConversation,
	getConversationMessages,
	saveMessage,
	touchConversation,
} from "@/features/agent/agent.queries";
import { chatBodySchema } from "@/features/agent/agent.schemas";
import type { SseEvent } from "@/features/agent/agent.types";

const app = new Hono();

/**
 * POST /api/agent/chat
 *
 * SSE stream — receives { sessionId, conversationId?, message },
 * runs the agent and streams back tool calls + text chunks.
 *
 * Event shapes (each data field is JSON):
 *   event: text        { type: "text",        chunk: string }
 *   event: tool_call   { type: "tool_call",   name: string, input: object }
 *   event: tool_result { type: "tool_result", toolCallId: string, content: string }
 *   event: done        { type: "done",        conversationId: string }
 *
 * Errors before the stream opens are returned as normal JSON responses.
 */
app.post("/chat", zValidator("json", chatBodySchema), async (c) => {
	const { sessionId, conversationId, message } = c.req.valid("json");

	let conversation: Awaited<ReturnType<typeof createConversation>>;

	if (conversationId) {
		const existing = await getConversation(conversationId, sessionId);
		if (!existing) {
			return c.json({ error: "Conversation not found" }, HttpStatusCode.NOT_FOUND);
		}
		conversation = existing;
	} else {
		const created = await createConversation(sessionId);
		if (!created) {
			return c.json({ error: "Failed to create conversation" }, HttpStatusCode.INTERNAL_SERVER_ERROR);
		}
		conversation = created;
	}

	await saveMessage({
		id: crypto.randomUUID(),
		conversationId: conversation.id,
		role: "user",
		content: message,
	});

	const history = await getConversationMessages(conversation.id);

	return streamSSE(c, async (stream) => {
		const send = async (event: SseEvent) => {
			await stream.writeSSE({
				event: event.type,
				data: JSON.stringify(event),
			});
		};

		// Accumulates the full assistant text so it can be persisted after
		let assistantText = "";

		try {
			for await (const event of runAgent({
				sessionId,
				conversationId: conversation.id,
				history,
			})) {
				if (event.type === "text") {
					assistantText += event.chunk;
				}
				if (event.type !== "done") {
					await send(event);
				}
			}

			await saveMessage({
				id: crypto.randomUUID(),
				conversationId: conversation.id,
				role: "assistant",
				content: assistantText,
			});

			await touchConversation(conversation.id);

			await send({ type: "done", conversationId: conversation.id });
		} catch (err) {
			await stream.writeSSE({
				event: "error",
				data: JSON.stringify({
					message: err instanceof Error ? err.message : "Unknown error",
				}),
			});
		}
	});
});

export default app;
