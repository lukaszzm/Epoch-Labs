import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import type * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AlertDialogProps extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {}

export function AlertDialog({ ...props }: AlertDialogProps) {
	return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

export interface AlertDialogTriggerProps extends React.ComponentProps<typeof AlertDialogPrimitive.Trigger> {}

export function AlertDialogTrigger({ ...props }: AlertDialogTriggerProps) {
	return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

export interface AlertDialogPortalProps extends React.ComponentProps<typeof AlertDialogPrimitive.Portal> {}

export function AlertDialogPortal({ ...props }: AlertDialogPortalProps) {
	return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

export interface AlertDialogOverlayProps extends React.ComponentProps<typeof AlertDialogPrimitive.Overlay> {}

export function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
	return (
		<AlertDialogPrimitive.Overlay
			data-slot="alert-dialog-overlay"
			className={cn(
				"fixed inset-0 z-50 bg-black/30 duration-100 supports-backdrop-filter:backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
				className,
			)}
			{...props}
		/>
	);
}

export interface AlertDialogContentProps extends React.ComponentProps<typeof AlertDialogPrimitive.Content> {
	size?: "default" | "sm";
}

export function AlertDialogContent({ className, size = "default", ...props }: AlertDialogContentProps) {
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<AlertDialogPrimitive.Content
				data-slot="alert-dialog-content"
				data-size={size}
				className={cn(
					"group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-6 rounded-4xl bg-popover p-6 text-popover-foreground shadow-xl ring-1 ring-foreground/5 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-md dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
					className,
				)}
				{...props}
			/>
		</AlertDialogPortal>
	);
}

export interface AlertDialogHeaderProps extends React.ComponentProps<"div"> {}

export function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
	return (
		<div
			data-slot="alert-dialog-header"
			className={cn(
				"grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
				className,
			)}
			{...props}
		/>
	);
}

export interface AlertDialogFooterProps extends React.ComponentProps<"div"> {}

export function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
	return (
		<div
			data-slot="alert-dialog-footer"
			className={cn(
				"flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
				className,
			)}
			{...props}
		/>
	);
}

export interface AlertDialogMediaProps extends React.ComponentProps<"div"> {}

export function AlertDialogMedia({ className, ...props }: AlertDialogMediaProps) {
	return (
		<div
			data-slot="alert-dialog-media"
			className={cn(
				"mb-2 inline-flex size-16 items-center justify-center rounded-full bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
				className,
			)}
			{...props}
		/>
	);
}

export interface AlertDialogTitleProps extends React.ComponentProps<typeof AlertDialogPrimitive.Title> {}

export function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
	return (
		<AlertDialogPrimitive.Title
			data-slot="alert-dialog-title"
			className={cn(
				"font-heading text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
				className,
			)}
			{...props}
		/>
	);
}

export interface AlertDialogDescriptionProps extends React.ComponentProps<typeof AlertDialogPrimitive.Description> {}

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
	return (
		<AlertDialogPrimitive.Description
			data-slot="alert-dialog-description"
			className={cn(
				"text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export interface AlertDialogActionProps
	extends React.ComponentProps<typeof AlertDialogPrimitive.Action>,
		Pick<ButtonProps, "variant" | "size"> {}

export function AlertDialogAction({
	className,
	variant = "default",
	size = "default",
	...props
}: AlertDialogActionProps) {
	return (
		<Button variant={variant} size={size} asChild>
			<AlertDialogPrimitive.Action data-slot="alert-dialog-action" className={cn(className)} {...props} />
		</Button>
	);
}

export interface AlertDialogCancelProps
	extends React.ComponentProps<typeof AlertDialogPrimitive.Cancel>,
		Pick<ButtonProps, "variant" | "size"> {}

export function AlertDialogCancel({
	className,
	variant = "outline",
	size = "default",
	...props
}: AlertDialogCancelProps) {
	return (
		<Button variant={variant} size={size} asChild>
			<AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" className={cn(className)} {...props} />
		</Button>
	);
}
