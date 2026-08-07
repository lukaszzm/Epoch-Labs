import { Tool } from "@/features/agent/config/tools";

export function isValidTool(toolName: string): toolName is Tool {
	return Object.values(Tool).includes(toolName as Tool);
}
