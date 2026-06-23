import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export function Layout({ children }: React.PropsWithChildren) {
	return (
		<div className="flex min-h-screen flex-col bg-background gap-12">
			<Header />
			<main className="flex-1 pt-16 gap-12">{children}</main>
			<Footer />
		</div>
	);
}
