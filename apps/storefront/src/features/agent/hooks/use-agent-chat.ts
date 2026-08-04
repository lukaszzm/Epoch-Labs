import { useCallback, useRef, useState } from "react";
import { streamAgentChat } from "@/features/agent/api/stream-agent-chat";
import type { Message, ToolActivity } from "@/features/agent/types";
import { getOrCreateSessionId } from "@/features/cart/utils/get-or-create-session";

export function useAgentChat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [activeTools, setActiveTools] = useState<ToolActivity[]>([]);
	const [isStreaming, setIsStreaming] = useState(false);
	const [conversationId, setConversationId] = useState<string | null>(null);
	const abortRef = useRef<AbortController | null>(null);

	const sendMessage = useCallback(
		async (userInput: string) => {
			if (isStreaming || !userInput.trim()) return;

			const trimmed = userInput.trim();
			const assistantId = crypto.randomUUID();

			setMessages((prev) => [
				...prev,
				{ id: crypto.randomUUID(), role: "user", content: trimmed },
				{ id: assistantId, role: "assistant", content: "" },
			]);
			setIsStreaming(true);
			setActiveTools([]);

			abortRef.current = new AbortController();

			try {
				const stream = streamAgentChat({
					sessionId: getOrCreateSessionId(),
					conversationId,
					message: trimmed,
					signal: abortRef.current.signal,
				});

				for await (const event of stream) {
					if (event.type === "text") {
						setMessages((prev) =>
							prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + event.chunk } : m)),
						);
					} else if (event.type === "tool_call") {
						setActiveTools((prev) => [...prev, { id: crypto.randomUUID(), name: event.name }]);
					} else if (event.type === "tool_result") {
						// Remove the oldest active tool when its result arrives
						setActiveTools((prev) => prev.slice(1));
					} else if (event.type === "done") {
						setConversationId(event.conversationId);
						setActiveTools([]);
					}
				}
			} catch (err) {
				if ((err as Error).name !== "AbortError") {
					setMessages((prev) =>
						prev.map((m) =>
							m.id === assistantId ? { ...m, content: m.content || "Something went wrong. Please try again." } : m,
						),
					);
				}
			} finally {
				setIsStreaming(false);
				abortRef.current = null;
			}
		},
		[isStreaming, conversationId],
	);

	const reset = useCallback(() => {
		abortRef.current?.abort();
		setMessages([]);
		setActiveTools([]);
		setIsStreaming(false);
		setConversationId(null);
	}, []);

	return { messages, activeTools, isStreaming, conversationId, sendMessage, reset };
}
