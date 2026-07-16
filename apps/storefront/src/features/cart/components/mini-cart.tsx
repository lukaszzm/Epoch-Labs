import { Fragment, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MiniCartEmpty } from "@/features/cart/components/mini-cart-empty";
import { MiniCartFooter } from "@/features/cart/components/mini-cart-footer";
import { MiniCartList } from "@/features/cart/components/mini-cart-list";
import { MiniCartTrigger } from "@/features/cart/components/mini-cart-trigger";
import { useCart } from "@/features/cart/hooks/use-cart";

export function MiniCart() {
	const [open, setOpen] = useState(false);
	const { data: cart } = useCart();

	const cartItems = cart?.items ?? [];

	const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
	const subtotalInCents = cartItems.reduce((sum, item) => sum + item.priceSnapshot * item.quantity, 0);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<MiniCartTrigger itemCount={itemCount} />
			</SheetTrigger>
			<SheetContent side="right">
				<SheetHeader>
					<SheetTitle>{itemCount > 0 ? `Your Cart (${itemCount})` : "Your Cart"}</SheetTitle>
				</SheetHeader>
				{itemCount > 0 ? (
					<Fragment>
						<MiniCartList items={cartItems} onNavigate={() => setOpen(false)} />
						<MiniCartFooter
							subtotalInCents={subtotalInCents}
							itemCount={itemCount}
							onProceedToCheckout={() => setOpen(false)}
						/>
					</Fragment>
				) : (
					<MiniCartEmpty />
				)}
			</SheetContent>
		</Sheet>
	);
}
