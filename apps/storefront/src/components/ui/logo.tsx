import { Link } from "@tanstack/react-router";
import { Button, type ButtonProps } from "@/components/ui/button";
import { AppRoute } from "@/config/app-routes";
import { cn } from "@/lib/utils";

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
				<span className="text-foreground bg-primary py-0.5 px-1.5">Epoch</span> Labs
			</Link>
		</Button>
	);
}
