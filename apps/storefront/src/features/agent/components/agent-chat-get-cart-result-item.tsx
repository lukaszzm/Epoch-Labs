import { Link } from "@tanstack/react-router";
import { AppRoute } from "@/config/app-routes";
import type { CartItem } from "@/features/agent/types";
import { formatCurrency } from "@/utils/format-currency";

interface AgentChatGetCartResultItemProps {
	item: CartItem;
	currency: string;
}

export function AgentChatGetCartResultItem({ item, currency }: AgentChatGetCartResultItemProps) {
	return (
		<li key={item.id} className="flex items-start justify-between gap-4 text-sm">
			<Link
				to={AppRoute.PRODUCT}
				params={{ slug: item.product.slug }}
				target="_blank"
				rel="noreferrer noopener"
				className="flex flex-col leading-snug hover:underline"
			>
				<span className="font-medium line-clamp-1">{item.product.name}</span>
				<span className="text-xs text-muted-foreground">
					{item.variant.name} × {item.quantity}
				</span>
			</Link>
			<span className="shrink-0 tabular-nums">{formatCurrency(item.lineTotalInCents, { currency })}</span>
		</li>
	);
}
