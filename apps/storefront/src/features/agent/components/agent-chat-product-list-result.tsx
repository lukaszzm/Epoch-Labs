import { Link } from "@tanstack/react-router";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { AppRoute } from "@/config/app-routes";
import type { ListProductsToolResult } from "@/features/agent/types";
import { formatCurrency } from "@/utils/format-currency";

interface AgentChatProductListResultProps {
	message: ListProductsToolResult;
}

export function AgentChatProductListResult({ message: { products } }: AgentChatProductListResultProps) {
	if (products.length === 0) {
		return null;
	}

	return (
		<BubbleGroup>
			<Bubble variant="muted" align="start">
				<BubbleContent className="flex flex-col gap-2 min-w-64">
					<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
						{products.length} {products.length === 1 ? "product" : "products"} found
					</span>
					<ul className="flex flex-col divide-y divide-border">
						{products.map((product) => (
							<li key={product.id} className="py-2 first:pt-0 last:pb-0">
								<Link
									to={AppRoute.PRODUCT}
									params={{ slug: product.slug }}
									target="_blank"
									rel="noreferrer noopener"
									className="flex items-baseline justify-between gap-4 group"
								>
									<div className="flex flex-col min-w-0">
										<span className="text-xs text-muted-foreground">{product.brand}</span>
										<span className="text-sm font-medium line-clamp-1 group-hover:underline">{product.name}</span>
									</div>
									{product.lowestPriceInCents != null && (
										<span className="shrink-0 text-sm tabular-nums">
											{formatCurrency(product.lowestPriceInCents, { currency: product.currency })}
										</span>
									)}
								</Link>
							</li>
						))}
					</ul>
				</BubbleContent>
			</Bubble>
		</BubbleGroup>
	);
}
