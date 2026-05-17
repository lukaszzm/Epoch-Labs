import type { AgentHints } from "@epoch-labs/db";

interface BuildCategoryTextOptions {
	name: string;
	description: string;
	agentHints: Pick<AgentHints, "synonyms" | "intents">;
}

export function buildCategoryText(c: BuildCategoryTextOptions): string {
	const synonyms = c.agentHints.synonyms.join(", ");
	const intents = c.agentHints.intents.join(", ");
	return `${c.name}. ${c.description} Synonyms: ${synonyms}. Intents: ${intents}.`.trim();
}
