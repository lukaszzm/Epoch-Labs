import { XIcon } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import { Dialog } from "radix-ui";
import { cn } from "@/utils/cn";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export const SheetPortal = Dialog.Portal;

export interface SheetOverlayProps extends React.ComponentProps<typeof Dialog.Overlay> {}

export function SheetOverlay({ className, ...props }: SheetOverlayProps) {
	return (
		<Dialog.Overlay
			data-slot="sheet-overlay"
			className={cn(
				"fixed inset-0 z-50 bg-black/60 backdrop-blur-xs",
				"data-[state=open]:animate-in data-[state=open]:fade-in-0",
				"data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
				className,
			)}
			{...props}
		/>
	);
}

const sheetContentVariants = cva(
	"fixed z-50 flex flex-col bg-background shadow-xl transition-all ease-in-out data-[state=open]:duration-300 data-[state=closed]:duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out focus:outline-none",
	{
		variants: {
			side: {
				top: "inset-x-0 top-0 max-h-dvh border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
				bottom:
					"inset-x-0 bottom-0 max-h-dvh border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
				left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
				right:
					"inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
			},
		},
		defaultVariants: {
			side: "right",
		},
	},
);

export interface SheetContentProps
	extends React.ComponentProps<typeof Dialog.Content>,
		VariantProps<typeof sheetContentVariants> {
	showCloseButton?: boolean;
}

export function SheetContent({ className, children, side, showCloseButton = true, ...props }: SheetContentProps) {
	return (
		<SheetPortal>
			<SheetOverlay />
			<Dialog.Content data-slot="sheet-content" className={cn(sheetContentVariants({ side }), className)} {...props}>
				{children}
				{showCloseButton && (
					<Dialog.Close
						data-slot="sheet-close"
						className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<XIcon className="size-4" aria-hidden />
						<span className="sr-only">Close</span>
					</Dialog.Close>
				)}
			</Dialog.Content>
		</SheetPortal>
	);
}

export interface SheetHeaderProps extends React.ComponentProps<"div"> {}

export function SheetHeader({ className, ...props }: SheetHeaderProps) {
	return <div data-slot="sheet-header" className={cn("flex flex-col gap-1.5 p-5 pb-0", className)} {...props} />;
}

export interface SheetFooterProps extends React.ComponentProps<"div"> {}

export function SheetFooter({ className, ...props }: SheetFooterProps) {
	return <div data-slot="sheet-footer" className={cn("mt-auto flex flex-col gap-2 p-5 pt-0", className)} {...props} />;
}

export interface SheetTitleProps extends React.ComponentProps<typeof Dialog.Title> {}

export function SheetTitle({ className, ...props }: SheetTitleProps) {
	return (
		<Dialog.Title
			data-slot="sheet-title"
			className={cn("text-base font-semibold text-foreground", className)}
			{...props}
		/>
	);
}

export interface SheetDescriptionProps extends React.ComponentProps<typeof Dialog.Description> {}

export function SheetDescription({ className, ...props }: SheetDescriptionProps) {
	return (
		<Dialog.Description
			data-slot="sheet-description"
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}
