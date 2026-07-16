import { cn } from "@/utils/cn";

export interface InputProps extends React.ComponentProps<"input"> {}

export function Input({ className, ...props }: InputProps) {
	return (
		<input
			data-slot="input"
			className={cn(
				"flex h-9 w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
				className,
			)}
			{...props}
		/>
	);
}
