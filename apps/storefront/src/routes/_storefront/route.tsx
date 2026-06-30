import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const Route = createFileRoute("/_storefront")({
	component: StorefrontLayout,
});

function StorefrontLayout() {
	return (
		<div className="flex min-h-screen flex-col bg-background gap-12">
			<Header />
			<main className="flex-1 pt-16 gap-12">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
