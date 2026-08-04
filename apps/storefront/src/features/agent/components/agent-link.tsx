import { ApertureIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AgentLinkProps extends ButtonProps {}

export function AgentLink(props: AgentLinkProps) {
	return (
		<div className="agent-link-ring fixed bottom-4 left-4 z-50 rounded-full p-0.5 shadow-lg shadow-primary/40">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button asChild size="icon-xl" className="bg-foreground hover:bg-foreground size-14" {...props}>
						<Link to="/agent" aria-label="Start an agentic commerce experience">
							<ApertureIcon className="size-9 text-primary" />
						</Link>
					</Button>
				</TooltipTrigger>
				<TooltipContent>Start an agentic commerce experience</TooltipContent>
			</Tooltip>
		</div>
	);
}
