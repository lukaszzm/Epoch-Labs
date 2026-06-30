import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { CampaignBanner } from "@/features/marketing/components/campaign-banner";
import { Hero } from "@/features/marketing/components/hero";
import { FeaturedProducts } from "@/features/products/components/featured-products";

export const Route = createFileRoute("/_storefront/")({
	component: StorefrontPage,
});

function StorefrontPage() {
	return (
		<Fragment>
			<Hero />
			<FeaturedProducts />
			<CampaignBanner />
		</Fragment>
	);
}
