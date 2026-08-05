import { ApertureIcon } from "@phosphor-icons/react";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import type { ToolActivity } from "@/features/agent/types";
import { camelToSnake } from "@/utils/camel-to-snake";

interface AgentChatThinkingProps {
	isStreaming: boolean;
	activeTool: ToolActivity | null | undefined;
}

export function AgentChatThinking({ isStreaming, activeTool }: AgentChatThinkingProps) {
	if (!isStreaming) {
		return null;
	}

	const label = activeTool ? `Calling '${camelToSnake(activeTool.name)}'…` : "Thinking…";

	return (
		<BubbleGroup>
			<Bubble variant="muted" align="start">
				<BubbleContent className="flex items-center gap-2 text-muted-foreground text-xs">
					<ApertureIcon className="size-3.5 text-primary animate-spin duration-200" />
					{label}
				</BubbleContent>
			</Bubble>
		</BubbleGroup>
	);
}
