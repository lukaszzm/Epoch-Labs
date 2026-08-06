import { AgentChatEmpty } from "@/features/agent/components/agent-chat-empty";
import { AgentChatTextMessage } from "@/features/agent/components/agent-chat-text-message";
import { AgentChatThinking } from "@/features/agent/components/agent-chat-thinking";
import { AgentChatToolResult } from "@/features/agent/components/agent-chat-tool-result";
import type { Message, ToolActivity } from "@/features/agent/types";

interface AgentChatMessagesProps {
	messages: Message[];
	activeTool: ToolActivity | null | undefined;
	isStreaming: boolean;
}

export function AgentChatMessages({ messages, activeTool, isStreaming }: AgentChatMessagesProps) {
	if (messages.length === 0) {
		return <AgentChatEmpty />;
	}

	return (
		<div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
			{messages.map((message) =>
				message.role === "tool_result" ? (
					<AgentChatToolResult key={message.id} message={message} />
				) : (
					<AgentChatTextMessage key={message.id} message={message} />
				),
			)}
			<AgentChatThinking isStreaming={isStreaming} activeTool={activeTool} />
		</div>
	);
}
