import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ProductImage } from "@/features/products/components/product-image";
import type { Product } from "@/features/products/schemas/product-schema";
import { formatCurrency } from "@/utils/format-currency";

export interface ProductPreviewProps {
	product: Product;
}

export function ProductPreview({ product }: ProductPreviewProps) {
	const { name, brand, shortDescription, images, currency, lowestPriceInCents } = product;

	const primaryImage = images?.find((img) => img.isPrimary) ?? images?.at(0);
	const price = formatCurrency(lowestPriceInCents, { currency });

	return (
		<Container>
			<BackButton fallbackTo="/" className="mb-6" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
				<div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
					<ProductImage
						src={primaryImage?.url ?? ""}
						alt={primaryImage?.alt ?? name}
						layout="fullWidth"
						className="size-full object-cover"
					/>
				</div>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-1">
						<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{brand}</span>
						<h1 className="text-2xl font-semibold leading-snug text-foreground">{name}</h1>
					</div>
					<span className="text-xl font-medium text-foreground">{price}</span>
					{shortDescription && <p className="text-sm text-muted-foreground leading-relaxed">{shortDescription}</p>}
					<Button size="xl" disabled>
						Not purchasable
					</Button>
				</div>
			</div>
		</Container>
	);
}
