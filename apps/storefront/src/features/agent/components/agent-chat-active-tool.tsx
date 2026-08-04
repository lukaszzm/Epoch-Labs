import { ApertureIcon } from "@phosphor-icons/react";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import type { ToolActivity } from "@/features/agent/types";

interface AgentChatActiveToolProps {
	toolActivity: ToolActivity;
}

export function AgentChatActiveTool({ toolActivity }: AgentChatActiveToolProps) {
	return (
		<BubbleGroup>
			<Bubble variant="muted" align="start">
				<BubbleContent className="flex items-center gap-2 text-muted-foreground text-xs">
					<ApertureIcon className="size-3.5 text-primary animate-spin" />
					{toolActivity.name.replaceAll("_", " ")}…
				</BubbleContent>
			</Bubble>
		</BubbleGroup>
	);
}
