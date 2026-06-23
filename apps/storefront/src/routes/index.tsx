import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/layout";
import { CampaignBanner } from "@/features/marketing/components/campaign-banner";
import { Hero } from "@/features/marketing/components/hero";
import { FeaturedProducts } from "@/features/products/components/featured-products";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<Layout>
			<Hero />
			<FeaturedProducts />
			<CampaignBanner />
		</Layout>
	);
}
