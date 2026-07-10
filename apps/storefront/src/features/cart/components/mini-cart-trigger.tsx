import { BasketIcon } from "@phosphor-icons/react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/utils/cn";

interface MiniCartTriggerProps extends ButtonProps {
	itemCount: number;
}

export function MiniCartTrigger({ itemCount, className, ...props }: MiniCartTriggerProps) {
	return (
		<Button
			variant="ghost"
			size="icon-xl"
			aria-label={`View cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
			className={cn("relative", className)}
			{...props}
		>
			<BasketIcon className="size-5" aria-hidden />
			{itemCount > 0 && (
				<span
					aria-hidden
					className="absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground leading-none tabular-nums"
				>
					{itemCount > 99 ? "99+" : itemCount}
				</span>
			)}
		</Button>
	);
}
