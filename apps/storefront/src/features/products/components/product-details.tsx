import { useState } from "react";
import { BackButton } from "@/components/ui/back-button";
import { Container } from "@/components/ui/container";
import { AddToCart } from "@/features/cart/components/add-to-cart";
import { ProductImage } from "@/features/products/components/product-image";
import { ProductVariantSelect } from "@/features/products/components/product-variant-select";
import type { Product } from "@/features/products/schemas/product-schema";
import type { ProductVariant } from "@/features/products/schemas/product-variant-schema";
import { getDefaultVariantOrThrow } from "@/features/products/utils/get-default-variant-or-throw";
import { formatCurrency } from "@/utils/format-currency";

interface ProductDetailsProps {
	product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
	const { name, brand, shortDescription, images, currency, variants } = product;

	const defaultVariant = getDefaultVariantOrThrow(product);
	const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(defaultVariant);

	const primaryImage = images?.find((img) => img.isPrimary) ?? images?.at(0);

	const price = selectedVariant
		? formatCurrency(selectedVariant.priceInCents, { currency })
		: formatCurrency(product.lowestPriceInCents, { currency });

	const compareAtPrice =
		selectedVariant?.compareAtPriceInCents != null
			? formatCurrency(selectedVariant.compareAtPriceInCents, { currency })
			: null;

	const isOnSale = compareAtPrice !== null;
	const hasMultipleVariants = variants.length > 1;

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
					<div className="flex items-baseline gap-2">
						<span className="text-xl font-medium text-foreground">{price}</span>
						{isOnSale && <span className="text-sm line-through text-muted-foreground">{compareAtPrice}</span>}
					</div>
					{shortDescription && <p className="text-sm text-muted-foreground leading-relaxed">{shortDescription}</p>}
					{hasMultipleVariants && (
						<div className="flex flex-col gap-2">
							<span className="text-sm font-medium text-foreground">Size</span>
							<ProductVariantSelect
								selectedVariant={selectedVariant}
								variants={variants}
								onSelect={setSelectedVariant}
							/>
						</div>
					)}
					<AddToCart product={product} variant={selectedVariant} />
				</div>
			</div>
		</Container>
	);
}
