import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import type { TextMessage } from "@/features/agent/types";

interface AgentChatTextMessageProps {
	message: TextMessage;
}

export function AgentChatTextMessage({ message }: AgentChatTextMessageProps) {
	const isUserMessage = message.role === "user";

	if (!message.content) {
		return null;
	}

	return (
		<BubbleGroup key={message.id} data-align={isUserMessage ? "end" : "start"}>
			<Bubble variant={isUserMessage ? "default" : "muted"} align={isUserMessage ? "end" : "start"}>
				<BubbleContent>{message.content}</BubbleContent>
			</Bubble>
		</BubbleGroup>
	);
}
