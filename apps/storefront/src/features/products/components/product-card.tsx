import { Link } from "@tanstack/react-router";
import type { Product } from "@/features/products/schemas/product-schema";
import { formatCurrency } from "@/utils/format-currency";
import { ProductImage } from "./product-image";

export interface ProductCardProps extends Product {}

export function ProductCard({ slug: _, name, images, brand, lowestPriceInCents, currency }: ProductCardProps) {
	const formattedPrice = formatCurrency(lowestPriceInCents, { currency });
	const primaryImage = images?.find((image) => image.isPrimary) || images?.at(0);

	// TODO: Add a link to the product detail page using the slug when the product card is clicked.
	return (
		<Link to="/" aria-label={name} className="group flex flex-col gap-3">
			<div className="relative aspect-square overflow-hidden rounded-md bg-muted">
				<ProductImage
					src={primaryImage?.url ?? ""}
					alt={primaryImage?.alt ?? ""}
					layout="fullWidth"
					className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
			<div className="flex flex-col gap-0.5">
				<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{brand}</span>
				<div className="flex items-baseline justify-between gap-2">
					<span className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:underline">
						{name}
					</span>
					<span className="shrink-0 text-sm text-foreground">{formattedPrice}</span>
				</div>
			</div>
		</Link>
	);
}
