import { AgenticLogo } from "@/components/ui/agentic-logo";
import { AgentNewChat } from "@/features/agent/components/agent-new-chat";

export function AgentHeader() {
	const newChatHandler = () => {
		console.log("New Chat clicked - NOT IMPLEMENTED");
	};

	return (
		<header className="flex items-center justify-between gap-4 p-4 border-b border-border">
			<AgenticLogo />
			<AgentNewChat onConfirm={newChatHandler} />
		</header>
	);
}
