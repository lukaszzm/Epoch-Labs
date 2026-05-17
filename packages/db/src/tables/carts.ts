import { index, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * Lifecycle state of a cart.
 * - active    — in use, shown to the customer and the agent.
 * - merged    — a guest cart absorbed into a user cart after sign-in.
 * - converted — turned into an order; read-only.
 * - abandoned — session expired without checkout.
 */
export const cartStatus = pgEnum("cart_status", [
	"active",
	"merged",
	"converted",
	"abandoned",
]);

export type CartStatus = (typeof cartStatus.enumValues)[number];

/**
 * A shopping session. Each browser session starts with one active cart.
 * Guest carts are identified by sessionId; user carts also carry a userId
 * once the customer signs in or creates an account at checkout.
 */
export const carts = pgTable(
	"carts",
	{
		id: text("id").primaryKey(),

		/**
		 * The authenticated owner of this cart.
		 * Null for anonymous / guest sessions.
		 * Set when a user signs in or creates an account at checkout.
		 */
		userId: text("user_id").references(() => users.id, {
			onDelete: "set null",
		}),

		/**
		 * Browser/device session identifier stored in localStorage.
		 * Used to restore guest carts across page loads.
		 */
		sessionId: text("session_id").notNull(),

		/**
		 * Lifecycle state. Only `active` carts are surfaced to the customer and agent.
		 */
		status: cartStatus("status").notNull().default("active"),

		/**
		 * Timestamp of cart creation. Immutable.
		 */
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),

		/**
		 * Timestamp of last update to the cart or any of its items.
		 */
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},

	(t) => [
		/**
		 * Restore the active cart for a browser session.
		 */
		index("carts_session_id_idx").on(t.sessionId),

		/**
		 * Look up all carts belonging to a signed-in user.
		 */
		index("carts_user_id_idx").on(t.userId),

		/**
		 * Status-based filtering (e.g. fetch all abandoned carts for re-engagement).
		 */
		index("carts_status_idx").on(t.status),
	],
);

export type Cart = typeof carts.$inferSelect;
export type CartDraft = typeof carts.$inferInsert;
