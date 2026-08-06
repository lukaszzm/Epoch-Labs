import { Link } from "@tanstack/react-router";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { AppRoute } from "@/config/app-routes";
import type { StartCheckoutToolResult } from "@/features/agent/types";
import { formatCurrency } from "@/utils/format-currency";

interface AgentChatStartCheckoutResultProps {
	message: StartCheckoutToolResult;
}

const MULTIPLIER_SYMBOL = "×";

export function AgentChatStartCheckoutResult({ message: { order } }: AgentChatStartCheckoutResultProps) {
	return (
		<BubbleGroup>
			<Bubble variant="muted" align="start">
				<BubbleContent className="flex flex-col gap-2 min-w-48">
					<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
						Order · {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
					</span>
					<ul className="flex flex-col gap-1.5">
						{order.lineItems.map((item) => (
							<li key={item.variantId} className="flex items-start justify-between gap-4 text-sm">
								<div className="flex flex-col leading-snug">
									<span className="font-medium line-clamp-1">{item.productName}</span>
									<span className="text-xs text-muted-foreground">
										{item.variantName} {MULTIPLIER_SYMBOL} {item.quantity}
									</span>
								</div>
								<span className="shrink-0 tabular-nums">
									{formatCurrency(item.lineTotalInCents, { currency: order.currency })}
								</span>
							</li>
						))}
					</ul>
					<div className="border-t border-border pt-2 flex items-center justify-between text-sm font-medium">
						<span>Total</span>
						<span>{formatCurrency(order.totalInCents, { currency: order.currency })}</span>
					</div>
					<Link
						to={AppRoute.ORDER_CONFIRMATION}
						params={{ id: order.id }}
						className="text-xs text-center text-muted-foreground hover:underline pt-0.5"
					>
						View order confirmation
					</Link>
				</BubbleContent>
			</Bubble>
		</BubbleGroup>
	);
}
