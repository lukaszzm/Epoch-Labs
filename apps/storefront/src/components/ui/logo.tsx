import { Link } from "@tanstack/react-router";
import { Button, type ButtonProps } from "@/components/ui/button";
import { AppRoute } from "@/config/app-routes";
import { cn } from "@/utils/cn";

export interface LogoProps extends Omit<ButtonProps, "children"> {}

export function Logo({ className, ...props }: LogoProps) {
	return (
		<Button
			variant="plain"
			size="lg"
			className={cn("font-bold text-2xl tracking-wider text-nowrap p-1", className)}
			{...props}
			asChild
		>
			<Link to={AppRoute.HOME}>
				<span className="text-primary">Epoch</span> Labs
			</Link>
		</Button>
	);
}
