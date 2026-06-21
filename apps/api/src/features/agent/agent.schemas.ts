import { z } from "zod";

export const chatBodySchema = z.object({
	sessionId: z.string().min(1),
	conversationId: z.string().min(1).optional(),
	message: z.string().min(1).max(4000),
});
