import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { AgentChatCartResultEmpty } from "@/features/agent/components/agent-chat-cart-result-empty";
import { AgentChatCartResultItem } from "@/features/agent/components/agent-chat-cart-result-item";
import type { CartToolResult } from "@/features/agent/types";
import { formatCurrency } from "@/utils/format-currency";

interface AgentChatCartResultProps {
	message: CartToolResult;
}

export function AgentChatCartResult({
	message: {
		data: { items, itemCount, totalInCents, currency },
	},
}: AgentChatCartResultProps) {
	if (items.length === 0) {
		return <AgentChatCartResultEmpty />;
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
							<AgentChatCartResultItem key={item.id} item={item} currency={currency} />
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
