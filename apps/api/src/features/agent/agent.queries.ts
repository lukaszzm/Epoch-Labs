import type { MessageDraft } from "@epoch-labs/db";
import { conversations, db, messages } from "@epoch-labs/db";
import { asc, eq } from "drizzle-orm";

export async function getConversation(conversationId: string, sessionId: string) {
	const rows = await db.select().from(conversations).where(eq(conversations.id, conversationId)).limit(1);

	const conversation = rows[0];
	if (!conversation || conversation.sessionId !== sessionId) {
		return null;
	}

	return conversation;
}

export async function createConversation(sessionId: string) {
	const id = crypto.randomUUID();

	const rows = await db.insert(conversations).values({ id, sessionId }).returning();

	return rows[0];
}

export async function getConversationMessages(conversationId: string) {
	return db.select().from(messages).where(eq(messages.conversationId, conversationId)).orderBy(asc(messages.createdAt));
}

export async function saveMessage(draft: MessageDraft) {
	const rows = await db.insert(messages).values(draft).returning();
	return rows[0];
}

export async function touchConversation(conversationId: string) {
	await db.update(conversations).set({ updatedAt: new Date() }).where(eq(conversations.id, conversationId));
}
