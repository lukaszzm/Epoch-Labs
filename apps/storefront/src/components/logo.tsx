import { Link } from "@tanstack/react-router";

export function Logo() {
	return (
		<Link to="/" className="font-bold text-2xl tracking-wider">
			<span className="text-primary">Epoch</span> Labs
		</Link>
	);
}
