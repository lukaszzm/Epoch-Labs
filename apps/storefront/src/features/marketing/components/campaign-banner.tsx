import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AppRoute } from "@/config/app-routes";

export function CampaignBanner() {
	return (
		<section
			aria-labelledby="campaign-banner"
			className="bg-muted-foreground xl:rounded-xl text-muted-foreground container mx-auto px-4 text-center"
		>
			<div className="mx-auto flex container flex-col items-center gap-6 px-4 py-20 text-center md:py-28">
				<p className="text-xs font-semibold uppercase tracking-widest text-background/80">Skincare</p>
				<h2 id="campaign-heading" className="max-w-2xl text-background text-4xl font-bold tracking-tight md:text-5xl">
					Your Daily Face Care Routine Starts Here
				</h2>
				<p className="max-w-lg text-pretty text-base text-background md:text-lg">
					Discover cleansers, moisturizers, and serums crafted to nourish and protect your skin every day.
				</p>
				<Button variant="outline" size="lg" className="mt-2 text-background hover:text-background" asChild>
					<Link to={AppRoute.CATEGORY} params={{ _splat: "skincare/face-care" }}>
						Browse Face Care Products
					</Link>
				</Button>
			</div>
		</section>
	);
}
