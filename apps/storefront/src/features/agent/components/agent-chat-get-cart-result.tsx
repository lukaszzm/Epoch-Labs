import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { AgentChatGetCartResultItem } from "@/features/agent/components/agent-chat-get-cart-result-item";
import type { GetCartToolResult } from "@/features/agent/types";
import { formatCurrency } from "@/utils/format-currency";

interface AgentChatGetCartResultProps {
	message: GetCartToolResult;
}

export function AgentChatGetCartResult({
	message: {
		data: { items, itemCount, totalInCents, currency },
	},
}: AgentChatGetCartResultProps) {
	if (items.length === 0) {
		return null; // Agent will respond in natural language if the cart is empty, so we don't need to render anything here.
	}

	return (
		<BubbleGroup>
			<Bubble variant="muted" align="start">
				<BubbleContent className="flex flex-col gap-2 min-w-48">
					<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
						Cart · {itemCount} {itemCount === 1 ? "item" : "items"}
					</span>
					<ul className="flex flex-col gap-1.5">
						{items.map((item) => (
							<AgentChatGetCartResultItem key={item.id} item={item} currency={currency} />
						))}
					</ul>
					<div className="border-t border-border pt-2 flex justify-between text-sm font-medium">
						<span>Total</span>
						<span>{formatCurrency(totalInCents, { currency })}</span>
					</div>
				</BubbleContent>
			</Bubble>
		</BubbleGroup>
	);
}
