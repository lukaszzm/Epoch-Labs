import { sseEventSchema } from "@/features/agent/schemas/sse-event-schema";
import type { SseBlock, SseEvent } from "@/features/agent/types";

function parseSseBlock(block: string): SseBlock | null {
	const lines = block.split("\n");

	let eventType = "message";
	let data = "";

	for (const line of lines) {
		if (line.startsWith("event:")) {
			eventType = line.slice(6).trim();
		} else if (line.startsWith("data:")) {
			data = line.slice(5).trim();
		}
	}

	if (!data) {
		return null;
	}

	return { eventType, data };
}

export function parseSseEvent(block: string): SseEvent | null {
	const parsed = parseSseBlock(block);

	if (!parsed) {
		return null;
	}

	let json: unknown;

	try {
		json = JSON.parse(parsed.data);
	} catch {
		return null;
	}

	const result = sseEventSchema.safeParse(json);
	return result.success ? result.data : null;
}
