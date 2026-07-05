export function Footer() {
	return (
		<footer className="flex h-12 items-center justify-center bg-foreground">
			<p className="text-sm text-background">&copy; {new Date().getFullYear()} Epoch Labs. All rights reserved.</p>
		</footer>
	);
}
