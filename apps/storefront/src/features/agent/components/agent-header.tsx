import { AgenticLogo } from "@/components/ui/agentic-logo";
import { AgentNewChat } from "@/features/agent/components/agent-new-chat";

interface AgentHeaderProps {
	onNewChat: () => void;
}

export function AgentHeader({ onNewChat }: AgentHeaderProps) {
	return (
		<header className="flex items-center justify-between gap-4 p-4 border-b border-border">
			<AgenticLogo />
			<AgentNewChat onConfirm={onNewChat} />
		</header>
	);
}
