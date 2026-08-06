import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";

export function AgentChatGetCartResultEmpty() {
	return (
		<BubbleGroup>
			<Bubble variant="muted" align="start">
				<BubbleContent className="text-sm text-muted-foreground">Your cart is empty.</BubbleContent>
			</Bubble>
		</BubbleGroup>
	);
}
