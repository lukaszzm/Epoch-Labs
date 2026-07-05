import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

export interface EmptyProps extends React.ComponentProps<"div"> {}

export function Empty({ className, ...props }: EmptyProps) {
	return (
		<div
			data-slot="empty"
			className={cn(
				"flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-2xl border-dashed p-12 text-center text-balance",
				className,
			)}
			{...props}
		/>
	);
}

export interface EmptyHeaderProps extends React.ComponentProps<"div"> {}

export function EmptyHeader({ className, ...props }: EmptyHeaderProps) {
	return (
		<div data-slot="empty-header" className={cn("flex max-w-sm flex-col items-center gap-2", className)} {...props} />
	);
}

export const emptyMediaVariants = cva(
	"mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground [&_svg:not([class*='size-'])]:size-5",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface EmptyMediaProps extends React.ComponentProps<"div">, VariantProps<typeof emptyMediaVariants> {}

export function EmptyMedia({ className, variant = "default", ...props }: EmptyMediaProps) {
	return (
		<div
			data-slot="empty-icon"
			data-variant={variant}
			className={cn(emptyMediaVariants({ variant, className }))}
			{...props}
		/>
	);
}

export interface EmptyTitleProps extends React.ComponentProps<"div"> {}

export function EmptyTitle({ className, ...props }: EmptyTitleProps) {
	return (
		<div
			data-slot="empty-title"
			className={cn("font-heading text-lg font-medium tracking-tight", className)}
			{...props}
		/>
	);
}

export interface EmptyDescriptionProps extends React.ComponentProps<"p"> {}

export function EmptyDescription({ className, ...props }: EmptyDescriptionProps) {
	return (
		<div
			data-slot="empty-description"
			className={cn(
				"text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
				className,
			)}
			{...props}
		/>
	);
}

export interface EmptyContentProps extends React.ComponentProps<"div"> {}

export function EmptyContent({ className, ...props }: EmptyContentProps) {
	return (
		<div
			data-slot="empty-content"
			className={cn("flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance", className)}
			{...props}
		/>
	);
}
