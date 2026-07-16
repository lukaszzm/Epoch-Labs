import { Label as LabelPrimitive } from "radix-ui";
import { cn } from "@/utils/cn";

export interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {}

export function Label({ className, ...props }: LabelProps) {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn(
				"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}
