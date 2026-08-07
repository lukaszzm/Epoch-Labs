import { useCallback, useRef, useState } from "react";
import { streamAgentChat } from "@/features/agent/api/stream-agent-chat";
import type { Message, ToolActivity } from "@/features/agent/types";
import { runAgentStream } from "@/features/agent/utils/run-agent-stream";
import { getOrCreateSessionId } from "@/features/cart/utils/get-or-create-session";

export function useChat() {
	const [conversationId, setConversationId] = useState<string | null>(null);
	const [isStreaming, setIsStreaming] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [activeTool, setActiveTool] = useState<ToolActivity | null>(null);
	const abortRef = useRef<AbortController | null>(null);

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

			abortRef.current = new AbortController();

			const stream = streamAgentChat({
				sessionId: getOrCreateSessionId(),
				conversationId,
				message: trimmed,
				signal: abortRef.current.signal,
			});

			await runAgentStream(stream, {
				onText: (chunk) =>
					setMessages((prev) =>
						prev.map((m) =>
							m.id === assistantId && m.role === "assistant" ? { ...m, content: m.content + chunk } : m,
						),
					),
				onToolStart: (name) => setActiveTool({ id: crypto.randomUUID(), name }),
				onToolEnd: () => setActiveTool(null),
				onDone: (newConversationId, toolResults) => {
					setConversationId(newConversationId);
					setActiveTool(null);
					if (toolResults.length > 0) {
						setMessages((prev) => {
							const idx = prev.findIndex((m) => m.id === assistantId);

							if (idx === -1) {
								return [...prev, ...toolResults];
							}

							return [...prev.slice(0, idx), ...toolResults, ...prev.slice(idx)];
						});
					}
				},
				onError: () =>
					setMessages((prev) =>
						prev.map((m) =>
							m.id === assistantId && m.role === "assistant"
								? { ...m, content: m.content || "Something went wrong. Please try again." }
								: m,
						),
					),
			});

			setIsStreaming(false);
			abortRef.current = null;
		},
		[isStreaming, conversationId],
	);

	const reset = useCallback(() => {
		abortRef.current?.abort();
		setMessages([]);
		setActiveTool(null);
		setIsStreaming(false);
		setConversationId(null);
	}, []);

	return { messages, activeTool, isStreaming, conversationId, sendMessage, reset };
}
