import { ApertureIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button, type ButtonProps } from "@/components/ui/button";
import { AppRoute } from "@/config/app-routes";
import { cn } from "@/lib/utils";

export interface AgenticLogoProps extends Omit<ButtonProps, "children"> {}

export function AgenticLogo({ className, ...props }: AgenticLogoProps) {
	return (
		<Button
			variant="plain"
			size="lg"
			className={cn(
				"font-bold text-2xl tracking-wider text-nowrap p-1 relative min-h-13 min-w-63 justify-start items-start rounded-none",
				className,
			)}
			{...props}
			asChild
		>
			<Link to={AppRoute.HOME}>
				<span className="text-foreground bg-primary px-1.5">Epoch</span>
				Labs
				<span className="absolute flex justify-start items-center gap-0.5 text-xs bottom-0 right-0 text-muted-foreground">
					<ApertureIcon className="size-4 text-primary" />
					Agentic Commerce
				</span>
			</Link>
		</Button>
	);
}
