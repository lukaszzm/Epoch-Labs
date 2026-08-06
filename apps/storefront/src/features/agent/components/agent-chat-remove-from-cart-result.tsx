import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import type { RemoveFromCartToolResult } from "@/features/agent/types";

interface AgentChatRemoveFromCartResultProps {
	message: RemoveFromCartToolResult;
}

export function AgentChatRemoveFromCartResult({ message }: AgentChatRemoveFromCartResultProps) {
	return (
		<BubbleGroup>
			<Bubble variant="muted" align="start">
				<BubbleContent className="flex flex-col gap-2 min-w-48">
					<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
						{message.action === "removed" ? "Removed from cart" : "Cart updated"}
					</span>
					<div className="flex flex-col text-sm leading-snug">
						<span className="font-medium">{message.productName}</span>
						<span className="text-xs text-muted-foreground">
							{message.variantName}
							{message.action === "reduced" && message.newQuantity != null
								? ` · ${message.newQuantity} remaining`
								: ""}
						</span>
					</div>
				</BubbleContent>
			</Bubble>
		</BubbleGroup>
	);
}
