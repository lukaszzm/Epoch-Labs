import { createFileRoute } from "@tanstack/react-router";
import { AgentChatInput } from "@/features/agent/components/agent-chat-input";
import { AgentChatMessages } from "@/features/agent/components/agent-chat-messages";
import { AgentDisclaimer } from "@/features/agent/components/agent-disclaimer";
import { AgentHeader } from "@/features/agent/components/agent-header";
import { useChat } from "@/features/agent/hooks/use-chat";
import { useScroll } from "@/features/agent/hooks/use-scroll";

export const Route = createFileRoute("/agent/")({
	component: AgentPage,
});

function AgentPage() {
	const { messages, activeTool, isStreaming, sendMessage, reset } = useChat();
	const bottomRef = useScroll([messages, activeTool]);

	return (
		<div className="dark flex min-h-screen flex-col bg-card text-foreground" style={{ colorScheme: "dark" }}>
			<AgentHeader onNewChat={reset} />
			<main className="flex-1 h-full w-full max-w-4xl mx-auto flex flex-col">
				<AgentChatMessages messages={messages} activeTool={activeTool} isStreaming={isStreaming} />
				<div ref={bottomRef} />
				<div className="space-y-2 flex flex-col w-full p-4">
					<AgentChatInput isStreaming={isStreaming} onSend={sendMessage} />
					<AgentDisclaimer />
				</div>
			</main>
		</div>
	);
}
