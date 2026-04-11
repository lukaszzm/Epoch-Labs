import { createFileRoute } from "@tanstack/react-router";
import { ApiStatusAlert } from "@/components/api-status-alert";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main className="grid place-content-center min-h-svh bg-muted">
			<section className="border border-border p-8 m-4 rounded-md bg-background/50 backdrop-blur-sm">
				<h1 className="mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
					Epoch Labs
				</h1>
				<p className="mb-8 max-w-2xl text-muted-foreground text-base sm:text-lg">
					Building the future of E-commerce with AI powered solution, helping
					businesses to thrive in the digital age.
				</p>
				<ApiStatusAlert />
			</section>
		</main>
	);
}
