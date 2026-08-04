import { AgentChatActiveTool } from "@/features/agent/components/agent-chat-active-tool";
import { AgentChatEmpty } from "@/features/agent/components/agent-chat-empty";
import { AgentChatTextMessage } from "@/features/agent/components/agent-chat-text-message";
import type { Message, ToolActivity } from "@/features/agent/types";

interface AgentChatMessagesProps {
	messages: Message[];
	activeTools: ToolActivity[];
	isStreaming: boolean;
}

export function AgentChatMessages({ messages, activeTools, isStreaming }: AgentChatMessagesProps) {
	if (messages.length === 0) {
		return <AgentChatEmpty />;
	}

	const activeTool = activeTools.at(0);

	return (
		<div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
			{messages.map((message) => (
				<AgentChatTextMessage key={message.id} message={message} isStreaming={isStreaming} />
			))}
			{activeTool && <AgentChatActiveTool toolActivity={activeTool} />}
		</div>
	);
}
