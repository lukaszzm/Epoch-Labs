import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CampaignBanner() {
	return (
		<section
			aria-labelledby="campaign-banner"
			className="bg-muted-foreground xl:rounded-xl text-muted-foreground container mx-auto px-4 text-center"
		>
			<div className="mx-auto flex container flex-col items-center gap-6 px-4 py-20 text-center md:py-28">
				<p className="text-xs font-semibold uppercase tracking-widest text-background/80">Our mission</p>
				<h2 id="campaign-heading" className="max-w-2xl text-background text-4xl font-bold tracking-tight md:text-5xl">
					Cosmetics for Every Skin Type
				</h2>
				<p className="max-w-lg text-pretty text-base text-background md:text-lg">
					Our products are designed to cater to all skin types, ensuring everyone can find their perfect match.
				</p>
				<Button variant="outline" size="lg" className="mt-2 text-background hover:text-background" asChild>
					<Link to="/">Explore Collections</Link>
				</Button>
			</div>
		</section>
	);
}
