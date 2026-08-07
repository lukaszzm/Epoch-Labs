import { ToolHandler } from "@/features/agent/config/tool-handlers";
import type { ToolResult } from "@/features/agent/types";
import { isValidTool } from "@/features/agent/utils/is-valid-tool";

export function parseToolResult(toolName: string, content: string): ToolResult | null {
	if (!isValidTool(toolName)) {
		return null;
	}

	const handler = ToolHandler[toolName];

	let raw: unknown;
	try {
		raw = JSON.parse(content);
	} catch {}

	return handler(raw);
}
