import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AgentHeader } from "@/features/agent/components/agent-header";

export const Route = createFileRoute("/agent")({
	component: AgentLayout,
});

function AgentLayout() {
	return (
		<div className="dark flex min-h-screen flex-col bg-card" style={{ colorScheme: "dark" }}>
			<AgentHeader />
			<main className="flex-1">
				<Outlet />
			</main>
		</div>
	);
}
