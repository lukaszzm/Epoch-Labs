import { ApertureIcon } from "@phosphor-icons/react";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { Skeleton } from "@/components/ui/skeleton";
import { AgentChatEmpty } from "@/features/agent/components/agent-chat-empty";
import type { Message, ToolActivity } from "@/features/agent/types";

interface AgentMessagesProps {
	messages: Message[];
	activeTools: ToolActivity[];
	isStreaming: boolean;
}

export function AgentMessages({ messages, activeTools, isStreaming }: AgentMessagesProps) {
	if (messages.length === 0) {
		return <AgentChatEmpty />;
	}

	return (
		<div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
			{messages.map((message) => (
				<BubbleGroup key={message.id} data-align={message.role === "user" ? "end" : "start"}>
					<Bubble
						variant={message.role === "user" ? "default" : "muted"}
						align={message.role === "user" ? "end" : "start"}
					>
						<BubbleContent>
							{message.content ||
								(isStreaming && message.role === "assistant" ? <Skeleton className="h-4 w-32" /> : null)}
						</BubbleContent>
					</Bubble>
				</BubbleGroup>
			))}

			{activeTools.length > 0 && (
				<BubbleGroup>
					<Bubble variant="muted" align="start">
						<BubbleContent className="flex items-center gap-2 text-muted-foreground text-xs">
							<ApertureIcon className="size-3.5 text-primary animate-spin" />
							{activeTools[0]?.name.replaceAll("_", " ")}…
						</BubbleContent>
					</Bubble>
				</BubbleGroup>
			)}
		</div>
	);
}
