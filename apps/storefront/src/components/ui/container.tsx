import { cn } from "@/utils/cn";

export interface ContainerProps extends React.ComponentProps<"div"> {}

export function Container({ className, ...props }: ContainerProps) {
	return <div className={cn("xl:container mx-auto p-2 py-8", className)} {...props} />;
}
