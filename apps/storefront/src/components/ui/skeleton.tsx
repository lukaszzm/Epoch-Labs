import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.ComponentProps<"div"> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
	return <div data-slot="skeleton" className={cn("animate-pulse rounded-2xl bg-muted", className)} {...props} />;
}
