import { carts } from "@db/tables/carts";
import { users } from "@db/tables/users";
import {
	index,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

/**
 * Lifecycle state of an order:
 * - pending    - created, awaiting payment confirmation.
 * - confirmed  - payment received, awaiting fulfilment.
 * - processing - being picked and packed.
 * - shipped    - dispatched, in transit.
 * - delivered  - confirmed received by the customer.
 * - cancelled  - voided before dispatch.
 * - refunded   - payment returned after delivery.
 */
export const orderStatus = pgEnum("order_status", [
	"pending",
	"confirmed",
	"processing",
	"shipped",
	"delivered",
	"cancelled",
	"refunded",
]);

export type OrderStatus = (typeof orderStatus.enumValues)[number];

/**
 * Shipping / billing address captured at checkout.
 * Stored as a JSON snapshot so historical orders are unaffected
 * if the customer later changes their address.
 */
export type ShippingAddress = {
	/**
	 * Full name of the recipient, for shipping labels and delivery instructions.
	 */
	fullName: string;

	/**
	 * Primary address line, e.g. street and number.
	 */
	line1: string;

	/**
	 * Secondary address line, e.g. apartment or suite number. Optional.
	 */
	line2?: string;

	/**
	 * City or locality.
	 */
	city: string;

	/**
	 * State, province, or region. Optional.
	 */
	state?: string;

	/**
	 * Postal or ZIP code.
	 */
	postalCode: string;

	/**
	 * ISO 3166-1 alpha-2 country code (e.g. "PL", "DE").
	 */
	country: string;

	/**
	 * Phone number for delivery issues or SMS updates. Optional.
	 */
	phone?: string;
};

/**
 * A confirmed purchase created by converting an active cart.
 */
export const orders = pgTable(
	"orders",
	{
		id: text("id").primaryKey(),

		/**
		 * The cart this order was created from.
		 * Restricted to preserve the audit trail: carts are never deleted after conversion.
		 */
		cartId: text("cart_id").references(() => carts.id, {
			onDelete: "restrict",
		}),

		/**
		 * The user who placed the order. Null for guest checkouts.
		 */
		userId: text("user_id").references(() => users.id, {
			onDelete: "set null",
		}),

		/**
		 * Lifecycle state of the order.
		 */
		status: orderStatus("status").notNull().default("pending"),

		/**
		 * Total amount charged, in the smallest currency unit.
		 * Sum of (priceSnapshot × quantity) across all order items at checkout time.
		 */
		totalInCents: integer("total_in_cents").notNull(),

		/**
		 * ISO 4217 currency code for this order (e.g. "USD", "PLN").
		 */
		currency: text("currency").notNull().default("USD"),

		/**
		 * Delivery address captured at checkout.
		 * Null for digital-only orders.
		 */
		shippingAddress: jsonb("shipping_address").$type<ShippingAddress>(),

		/**
		 * Timestamp of order creation. Immutable.
		 */
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),

		/**
		 * Timestamp of last status change or field update.
		 */
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},

	(t) => [
		/**
		 * Load all orders for a signed-in user (order history).
		 */
		index("orders_user_id_idx").on(t.userId),

		/**
		 * Status-based filtering (e.g. all pending orders for the fulfilment queue).
		 */
		index("orders_status_idx").on(t.status),

		/**
		 * Reverse-lookup: "Which order did a given cart produce?"
		 */
		index("orders_cart_id_idx").on(t.cartId),
	],
);

export type Order = typeof orders.$inferSelect;
export type OrderDraft = typeof orders.$inferInsert;
