import { CheckCircleIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AppRoute } from "@/config/app-routes";
import { OrderStatusBadge } from "@/features/checkout/components/order-status-badge";
import type { Order } from "@/features/checkout/schemas/order-schema";
import { formatCurrency } from "@/utils/format-currency";

interface OrderConfirmationProps {
	order: Order;
}

export function OrderConfirmation({ order }: OrderConfirmationProps) {
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		dateStyle: "long",
		timeStyle: "short",
	}).format(new Date(order.createdAt));

	return (
		<div className="flex flex-col items-center justify-center py-24 text-center space-y-2 px-4 sm:px-0">
			<CheckCircleIcon className="mb-2 size-16 text-primary" />
			<h1 className="text-3xl font-bold">Order Confirmed!</h1>
			<p className="text-muted-foreground">Thank you for your purchase. Your order has been placed successfully.</p>
			<div className="mt-6 w-full sm:max-w-xl rounded-2xl border border-border bg-card text-left text-sm divide-y divide-border">
				<div className="flex justify-between px-4 py-3">
					<span className="text-muted-foreground">Order ID</span>
					<span className="font-mono font-medium truncate max-w-36 sm:max-w-none">{order.id}</span>
				</div>
				<div className="flex justify-between px-4 py-3">
					<span className="text-muted-foreground">Date</span>
					<span className="font-medium">{formattedDate}</span>
				</div>
				<div className="flex justify-between items-center px-4 py-3">
					<span className="text-muted-foreground">Status</span>
					<OrderStatusBadge status={order.status} />
				</div>
				<div className="flex justify-between px-4 py-3">
					<span className="text-muted-foreground">Total</span>
					<span className="font-semibold">{formatCurrency(order.totalInCents, { currency: order.currency })}</span>
				</div>
			</div>
			{order.items.length > 0 && (
				<div className="mt-2 w-full sm:max-w-xl  rounded-2xl border border-border bg-card text-left text-sm">
					<p className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
						Items ordered
					</p>
					<ul className="divide-y divide-border">
						{order.items.map((item) => (
							<li key={item.id} className="flex items-center gap-3 px-4 py-3">
								{item.variantSnapshot.imageUrl ? (
									<img
										src={item.variantSnapshot.imageUrl}
										alt={item.variantSnapshot.productName}
										className="size-12 shrink-0 rounded-lg object-cover bg-muted"
									/>
								) : (
									<div className="size-12 shrink-0 rounded-lg bg-muted" />
								)}
								<div className="min-w-0 flex-1">
									<p className="truncate font-medium">{item.variantSnapshot.productName}</p>
									<p className="text-xs text-muted-foreground">
										{item.variantSnapshot.name} · Qty {item.quantity}
									</p>
								</div>
								<span className="shrink-0 font-medium">
									{formatCurrency(item.priceInCents * item.quantity, { currency: order.currency })}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
			<Button size="xl" className="mt-4 w-full max-w-xs" asChild>
				<Link to={AppRoute.HOME}>Continue Shopping</Link>
			</Button>
		</div>
	);
}
