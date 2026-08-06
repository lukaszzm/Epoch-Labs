import { Link } from "@tanstack/react-router";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { AppRoute } from "@/config/app-routes";
import type { GetProductDetailToolResult } from "@/features/agent/types";
import { formatCurrency } from "@/utils/format-currency";

interface AgentChatProductDetailResultProps {
	message: GetProductDetailToolResult;
}

export function AgentChatProductDetailResult({ message: { product } }: AgentChatProductDetailResultProps) {
	const availableVariants = product.variants.filter((v) => v.isAvailable);

	return (
		<BubbleGroup>
			<Bubble variant="muted" align="start">
				<BubbleContent className="flex flex-col gap-3 min-w-56">
					<div className="flex flex-col gap-0.5">
						<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{product.brand}</span>
						<Link
							to={AppRoute.PRODUCT}
							params={{ slug: product.slug }}
							target="_blank"
							rel="noreferrer noopener"
							className="text-sm font-semibold leading-snug hover:underline"
						>
							{product.name}
						</Link>
						{product.shortDescription && (
							<p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
								{product.shortDescription}
							</p>
						)}
					</div>
					{availableVariants.length > 0 && (
						<ul className="flex flex-col gap-1 border-t border-border pt-2">
							{availableVariants.map((variant) => (
								<li key={variant.id} className="flex items-baseline justify-between gap-4 text-sm">
									<span className="text-muted-foreground">{variant.name}</span>
									<div className="flex items-baseline gap-1.5 shrink-0">
										{variant.compareAtPriceInCents != null &&
											variant.compareAtPriceInCents > variant.priceInCents && (
												<span className="tabular-nums text-xs text-muted-foreground line-through">
													{formatCurrency(variant.compareAtPriceInCents, { currency: product.currency })}
												</span>
											)}
										<span className="tabular-nums font-medium">
											{formatCurrency(variant.priceInCents, { currency: product.currency })}
										</span>
									</div>
								</li>
							))}
						</ul>
					)}
				</BubbleContent>
			</Bubble>
		</BubbleGroup>
	);
}
