import { CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react";
import { Slot } from "radix-ui";
import { cn } from "@/utils/cn";

export interface BreadcrumbProps extends React.ComponentProps<"nav"> {}

export function Breadcrumb({ className, ...props }: BreadcrumbProps) {
	return <nav aria-label="breadcrumb" data-slot="breadcrumb" className={cn(className)} {...props} />;
}

export interface BreadcrumbListProps extends React.ComponentProps<"ol"> {}

export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(
				"flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground sm:gap-2.5",
				className,
			)}
			{...props}
		/>
	);
}

export interface BreadcrumbItemProps extends React.ComponentProps<"li"> {}

export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
	return <li data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}

export interface BreadcrumbLinkProps extends React.ComponentProps<"a"> {
	asChild?: boolean;
}

export function BreadcrumbLink({ asChild, className, ...props }: BreadcrumbLinkProps) {
	const Comp = asChild ? Slot.Root : "a";

	return (
		<Comp data-slot="breadcrumb-link" className={cn("transition-colors hover:text-foreground", className)} {...props} />
	);
}

export interface BreadcrumbPageProps extends React.ComponentProps<"span"> {}

export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
	return (
		<span
			data-slot="breadcrumb-page"
			role="presentation"
			aria-disabled="true"
			aria-current="page"
			className={cn("font-normal text-foreground", className)}
			{...props}
		/>
	);
}

export interface BreadcrumbSeparatorProps extends React.ComponentProps<"li"> {}

export function BreadcrumbSeparator({ children, className, ...props }: BreadcrumbSeparatorProps) {
	return (
		<li
			data-slot="breadcrumb-separator"
			role="presentation"
			aria-hidden="true"
			className={cn("[&>svg]:size-3.5", className)}
			{...props}
		>
			{children ?? <CaretRightIcon />}
		</li>
	);
}

export interface BreadcrumbEllipsisProps extends React.ComponentProps<"span"> {}

export function BreadcrumbEllipsis({ className, ...props }: BreadcrumbEllipsisProps) {
	return (
		<span
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			aria-hidden="true"
			className={cn("flex size-5 items-center justify-center [&>svg]:size-4", className)}
			{...props}
		>
			<DotsThreeIcon />
			<span className="sr-only">More</span>
		</span>
	);
}
