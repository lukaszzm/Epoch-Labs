import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/features/checkout/schemas/order-schema";

interface OrderStatusBadgeProps {
	status: OrderStatus;
}

const STATUS_STYLES = {
	pending: "bg-yellow-100 text-yellow-800",
	confirmed: "bg-blue-100 text-blue-800",
	processing: "bg-blue-100 text-blue-800",
	shipped: "bg-purple-100 text-purple-800",
	delivered: "bg-green-100 text-green-800",
	cancelled: "bg-red-100 text-red-800",
	refunded: "bg-orange-100 text-orange-800",
} as const satisfies Record<OrderStatus, string>;

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
	const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

	return <Badge className={STATUS_STYLES[status]}>{statusLabel}</Badge>;
}
