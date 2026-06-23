import { Link } from "@tanstack/react-router";
import { Button } from "@/components/button";
import { Logo } from "@/components/logo";

export function Header() {
	return (
		<header className="border-b border-border bg-background fixed top-0 left-0 right-0 z-50">
			<div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
				<div className="flex items-center gap-2">
					<Logo />
				</div>
				<nav>
					<ul className="flex items-center gap-4">
						<li>
							<Button variant="ghost" asChild>
								<Link to="/agent" className="text-sm font-medium text-muted-foreground hover:text-primary">
									Agent
								</Link>
							</Button>
						</li>
						<li>
							<Button variant="ghost" asChild>
								<Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
									Home
								</Link>
							</Button>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
