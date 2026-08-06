import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import type { AddToCartToolResult } from "@/features/agent/types";
import { formatCurrency } from "@/utils/format-currency";

interface AgentChatAddToCartResultProps {
	message: AddToCartToolResult;
}

export function AgentChatAddToCartResult({ message }: AgentChatAddToCartResultProps) {
	return (
		<BubbleGroup>
			<Bubble variant="muted" align="start">
				<BubbleContent className="flex flex-col gap-2 min-w-48">
					<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Added to cart</span>
					<div className="flex items-start justify-between gap-4 text-sm">
						<div className="flex flex-col leading-snug">
							<span className="font-medium">{message.productName}</span>
							<span className="text-xs text-muted-foreground">
								{message.variantName} × {message.quantity}
							</span>
						</div>
						<span className="shrink-0 tabular-nums">
							{formatCurrency(message.priceInCents * message.quantity, { currency: message.currency })}
						</span>
					</div>
				</BubbleContent>
			</Bubble>
		</BubbleGroup>
	);
}
