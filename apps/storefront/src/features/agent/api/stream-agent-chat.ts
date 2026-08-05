import { ApiRoute } from "@/config/api-routes";
import type { SseEvent } from "@/features/agent/types";
import { parseSseEvent } from "@/features/agent/utils/parse-sse-event";
import { buildApiUrl } from "@/utils/build-api-url";

interface StreamAgentChatParams {
	sessionId: string;
	conversationId: string | null;
	message: string;
	signal?: AbortSignal;
}

export async function* streamAgentChat({
	sessionId,
	conversationId,
	message,
	signal,
}: StreamAgentChatParams): AsyncGenerator<SseEvent> {
	const res = await fetch(buildApiUrl(ApiRoute.AGENT_CHAT), {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ sessionId, conversationId: conversationId ?? undefined, message }),
		signal,
	});

	if (!res.ok || !res.body) {
		throw new Error(`Request failed: ${res.statusText}`);
	}

	const reader = res.body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";

	while (true) {
		const { done, value } = await reader.read();

		if (done) {
			break;
		}

		buffer += decoder.decode(value, { stream: true });
		const blocks = buffer.split("\n\n");
		buffer = blocks.pop() ?? "";

		for (const block of blocks) {
			const event = parseSseEvent(block);
			if (event) yield event;
		}
	}
}
