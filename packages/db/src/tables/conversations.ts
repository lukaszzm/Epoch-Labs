import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "@/schema";

/**
 * A single agent chat session.
 * Identified by a browser-scoped sessionId stored in localStorage.
 * Multiple conversations can share a sessionId (one per visit / intent).
 */
export const conversations = pgTable(
	"conversations",
	{
		id: text("id").primaryKey(),

		/**
		 * Browser/device session identifier.
		 * Used to load conversation history without requiring the user to be signed in.
		 */
		sessionId: text("session_id").notNull(),

		/**
		 * The authenticated user this conversation belongs to.
		 * Null for anonymous sessions.
		 */
		userId: text("user_id").references(() => users.id, {
			onDelete: "set null",
		}),

		/**
		 * Auto-generated one-line summary for the conversation history UI.
		 * Produced by the agent after the first assistant turn.
		 */
		title: text("title"),

		/**
		 * Timestamp of conversation start. Immutable.
		 */
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),

		/**
		 * Timestamp of the last message in this conversation.
		 * Updated on every new message insert.
		 */
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},

	(t) => [
		/**
		 * Load all conversations for a session (anonymous history).
		 */
		index("conversations_session_id_idx").on(t.sessionId),

		/**
		 * Load all conversations for a signed-in user.
		 */
		index("conversations_user_id_idx").on(t.userId),
	],
);

export type Conversation = typeof conversations.$inferSelect;
export type ConversationDraft = typeof conversations.$inferInsert;
