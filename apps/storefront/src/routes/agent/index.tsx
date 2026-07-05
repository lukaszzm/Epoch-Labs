import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/agent/")({
	component: AgentPage,
});

function AgentPage() {
	return <div>Hello "/agent/"!</div>;
}
