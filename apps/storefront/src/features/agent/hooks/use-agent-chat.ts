import { useCallback, useRef, useState } from "react";
import { streamAgentChat } from "@/features/agent/api/stream-agent-chat";
import type { CartData, Message, ToolActivity } from "@/features/agent/types";
import { getOrCreateSessionId } from "@/features/cart/utils/get-or-create-session";

export function useAgentChat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [activeTool, setActiveTool] = useState<ToolActivity | null>(null);
	const [isStreaming, setIsStreaming] = useState(false);
	const [conversationId, setConversationId] = useState<string | null>(null);
	const abortRef = useRef<AbortController | null>(null);
	const toolNameQueueRef = useRef<string[]>([]);

	const sendMessage = useCallback(
		async (userInput: string) => {
			if (isStreaming || !userInput.trim()) {
				return;
			}

			const trimmed = userInput.trim();
			const assistantId = crypto.randomUUID();

			setMessages((prev) => [
				...prev,
				{ id: crypto.randomUUID(), role: "user", content: trimmed },
				{ id: assistantId, role: "assistant", content: "" },
			]);
			setIsStreaming(true);
			setActiveTool(null);
			toolNameQueueRef.current = [];

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
							prev.map((m) =>
								m.id === assistantId && m.role === "assistant" ? { ...m, content: m.content + event.chunk } : m,
							),
						);
					} else if (event.type === "tool_call") {
						toolNameQueueRef.current.push(event.name);
						setActiveTool({ id: crypto.randomUUID(), name: event.name });
					} else if (event.type === "tool_result") {
						const toolName = toolNameQueueRef.current.shift();
						setActiveTool(null);
						if (toolName === "getCart") {
							const data = JSON.parse(event.content) as CartData;
							setMessages((prev) => [
								...prev,
								{ id: crypto.randomUUID(), role: "tool_result", toolName: "getCart", data },
							]);
						}
					} else if (event.type === "done") {
						setConversationId(event.conversationId);
						setActiveTool(null);
					}
				}
			} catch (err) {
				if ((err as Error).name !== "AbortError") {
					setMessages((prev) =>
						prev.map((m) =>
							m.id === assistantId && m.role === "assistant"
								? { ...m, content: m.content || "Something went wrong. Please try again." }
								: m,
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
		toolNameQueueRef.current = [];
		setMessages([]);
		setActiveTool(null);
		setIsStreaming(false);
		setConversationId(null);
	}, []);

	return { messages, activeTool, isStreaming, conversationId, sendMessage, reset };
}
