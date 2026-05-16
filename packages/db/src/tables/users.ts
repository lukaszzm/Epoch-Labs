import {
	index,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * A registered or guest-identified user.
 * Created on first checkout interaction; email is optional until that point.
 */
export const users = pgTable(
	"users",
	{
		id: text("id").primaryKey(),

		/**
		 * User's email address. Optional until checkout.
		 * NULL is allowed — multiple guest rows may have no email.
		 * When non-null, must be globally unique.
		 */
		email: text("email"),

		/**
		 * Display name. Provided at checkout or via a future auth flow.
		 */
		name: text("name"),

		/**
		 * Timestamp of account creation. Immutable.
		 */
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),

		/**
		 * Timestamp of last update to any user field.
		 */
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},

	(t) => [
		/**
		 * Emails must be globally unique when set.
		 * PostgreSQL treats NULLs as distinct in unique indexes — multiple
		 * guest rows may have email = NULL without violating this constraint.
		 */
		uniqueIndex("users_email_idx").on(t.email),

		/**
		 * Look up a user by email (login / checkout de-duplication).
		 */
		index("users_email_lookup_idx").on(t.email),
	],
);

export type User = typeof users.$inferSelect;
export type UserDraft = typeof users.$inferInsert;
