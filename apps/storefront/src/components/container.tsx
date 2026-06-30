import { cn } from "@/utils/cn";

export interface ContainerProps extends React.ComponentProps<"div"> {}

export function Container({ className, ...props }: ContainerProps) {
	return <div className={cn("max-w-7xl mx-auto p-2 py-6 md:py-12", className)} {...props} />;
}
