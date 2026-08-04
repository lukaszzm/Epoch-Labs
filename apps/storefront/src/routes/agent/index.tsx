import { createFileRoute } from "@tanstack/react-router";
import { AgentChatInput } from "@/features/agent/components/agent-chat-input";
import { AgentHeader } from "@/features/agent/components/agent-header";
import { AgentMessages } from "@/features/agent/components/agent-messages";
import { useAgentChat } from "@/features/agent/hooks/use-agent-chat";
import { useScroll } from "@/features/agent/hooks/use-scroll";

export const Route = createFileRoute("/agent/")({
	component: AgentPage,
});

function AgentPage() {
	const { messages, activeTools, isStreaming, sendMessage, reset } = useAgentChat();
	const bottomRef = useScroll([messages, activeTools]);

	return (
		<div className="dark flex min-h-screen flex-col bg-card text-foreground" style={{ colorScheme: "dark" }}>
			<AgentHeader onNewChat={reset} />
			<main className="flex-1 h-full w-full max-w-4xl mx-auto flex flex-col">
				<AgentMessages messages={messages} activeTools={activeTools} isStreaming={isStreaming} />
				<div ref={bottomRef} />
				<AgentChatInput isStreaming={isStreaming} onSend={sendMessage} />
			</main>
		</div>
	);
}
