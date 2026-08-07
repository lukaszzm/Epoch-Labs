import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { AppRoute } from "@/config/app-routes";
import type { GetProductDetailToolResult } from "@/features/agent/types";
import { formatCurrency } from "@/utils/format-currency";

interface AgentChatProductDetailResultProps {
	message: GetProductDetailToolResult;
}

const LOW_STOCK_THRESHOLD = 5;
const ATTRIBUTE_LIMIT = 4;
const TAG_LIMIT = 5;

export function AgentChatProductDetailResult({ message: { product } }: AgentChatProductDetailResultProps) {
	const availableVariants = product.variants.filter((v) => v.isAvailable);
	const unavailableVariants = product.variants.filter((v) => !v.isAvailable);
	const attributeEntries = Object.entries(product.attributes).slice(0, ATTRIBUTE_LIMIT);
	const tags = product.tags.slice(0, TAG_LIMIT);

	return (
		<BubbleGroup>
			<Bubble variant="muted" align="start">
				<BubbleContent className="flex flex-col gap-3 min-w-56 max-w-md">
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
							<p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-3">
								{product.shortDescription}
							</p>
						)}
					</div>

					{product.reviewCount > 0 && (
						<div className="flex items-center gap-1.5">
							<span className="text-xs text-amber-500">★ {product.averageRating.toFixed(1)}</span>
							<span className="text-xs text-muted-foreground">
								({product.reviewCount} {product.reviewCount === 1 ? "review" : "reviews"})
							</span>
						</div>
					)}

					{attributeEntries.length > 0 && (
						<dl className="grid grid-cols-2 gap-x-3 gap-y-0.5 border-t border-border pt-2">
							{attributeEntries.map(([key, value]) => (
								<div key={key} className="contents">
									<dt className="text-xs text-muted-foreground capitalize">{key}</dt>
									<dd className="text-xs font-medium truncate">
										{Array.isArray(value) ? value.join(", ") : String(value)}
									</dd>
								</div>
							))}
						</dl>
					)}

					{tags.length > 0 && (
						<div className="flex flex-wrap gap-1">
							{tags.map((tag) => (
								<Badge key={tag} variant="secondary">
									{tag}
								</Badge>
							))}
						</div>
					)}

					{product.variants.length > 0 && (
						<ul className="flex flex-col gap-1 border-t border-border pt-2">
							{availableVariants.map((variant) => (
								<li key={variant.id} className="flex items-center justify-between gap-4 text-sm">
									<div className="flex flex-col min-w-0">
										<span className="text-muted-foreground truncate">{variant.name}</span>
										{variant.stockQuantity <= LOW_STOCK_THRESHOLD && (
											<span className="text-[10px] text-amber-500">Only {variant.stockQuantity} left</span>
										)}
									</div>
									<div className="flex items-baseline gap-1.5 shrink-0">
										{variant.compareAtPriceInCents != null && variant.compareAtPriceInCents > variant.priceInCents && (
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
							{unavailableVariants.map((variant) => (
								<li key={variant.id} className="flex items-center justify-between gap-4 text-sm opacity-40">
									<span className="text-muted-foreground truncate">{variant.name}</span>
									<span className="text-xs">Out of stock</span>
								</li>
							))}
						</ul>
					)}
				</BubbleContent>
			</Bubble>
		</BubbleGroup>
	);
}
