import type { SseEvent, ToolResult } from "@/features/agent/types";
import { parseToolResult } from "@/features/agent/utils/parse-tool-result";

export interface AgentStreamHandlers {
	onText: (chunk: string) => void;
	onToolStart: (name: string) => void;
	onToolEnd: () => void;
	onDone: (conversationId: string, toolResults: ToolResult[]) => void;
	onError: (err: Error) => void;
}

export async function runAgentStream(stream: AsyncGenerator<SseEvent>, handlers: AgentStreamHandlers): Promise<void> {
	const toolResultQueue: ToolResult[] = [];

	try {
		for await (const event of stream) {
			switch (event.type) {
				case "text":
					handlers.onText(event.chunk);
					break;
				case "tool_call":
					handlers.onToolStart(event.toolName);
					break;
				case "tool_result": {
					handlers.onToolEnd();
					const result = parseToolResult(event.toolName, event.content);
					if (result) {
						toolResultQueue.push(result);
					}
					break;
				}
				case "done":
					handlers.onDone(event.conversationId, toolResultQueue.splice(0));
					break;
			}
		}
	} catch (err) {
		if (err instanceof Error && err.name !== "AbortError") {
			handlers.onError(err);
		}
	}
}
