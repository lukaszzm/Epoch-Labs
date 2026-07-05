import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { cn } from "@/utils/cn";

export const Collapsible = CollapsiblePrimitive.Root;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

export interface CollapsibleContentProps extends React.ComponentProps<typeof CollapsiblePrimitive.Content> {}

export function CollapsibleContent({ className, ...props }: CollapsibleContentProps) {
	return (
		<CollapsiblePrimitive.Content
			data-slot="collapsible-content"
			className={cn(
				"overflow-hidden",
				"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1",
				"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-1",
				className,
			)}
			{...props}
		/>
	);
}
