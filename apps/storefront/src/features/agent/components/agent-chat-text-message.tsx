import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { Skeleton } from "@/components/ui/skeleton";
import type { Message } from "@/features/agent/types";

interface AgentChatTextMessageProps {
	message: Message;
	isStreaming?: boolean;
}

export function AgentChatTextMessage({ message, isStreaming }: AgentChatTextMessageProps) {
	return (
		<BubbleGroup key={message.id} data-align={message.role === "user" ? "end" : "start"}>
			<Bubble variant={message.role === "user" ? "default" : "muted"} align={message.role === "user" ? "end" : "start"}>
				<BubbleContent>
					{message.content || (isStreaming && message.role === "assistant" ? <Skeleton className="h-4 w-32" /> : null)}
				</BubbleContent>
			</Bubble>
		</BubbleGroup>
	);
}
