import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Button } from "@/components/ui/button";
import hero from "/hero.jpg?url";

export function Hero() {
	return (
		<div className="relative  h-72 md:h-130 w-full overflow-hidden">
			<div className="absolute inset-0">
				<Image src={hero} alt="" layout="fullWidth" />
			</div>
			<div className="absolute inset-0 bg-black/50">
				<div className="flex flex-col items-start justify-center h-full container mx-auto px-4 gap-4 text-white">
					<h1 className="text-4xl md:text-6xl font-bold">Welcome to Epoch Labs</h1>
					<p className="text-lg md:text-xl max-w-xl text-pretty">
						Discover our exclusive collection of cosmetics and beauty products. Shop now and elevate your beauty routine
						with Epoch Labs.
					</p>
					<Button size="lg" className="mt-4 min-w-32" asChild>
						<Link to="/">Shop Now</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
