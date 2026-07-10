import { MiniCartListItem } from "@/features/cart/components/mini-cart-list-item";
import type { CartItem } from "@/features/cart/schemas/cart-item-schema";

interface MiniCartListProps {
	items: CartItem[];
	onNavigate: () => void;
}

export function MiniCartList({ items, onNavigate }: MiniCartListProps) {
	if (items.length === 0) {
		return null;
	}

	return (
		<ul className="flex-1 overflow-y-auto px-5 py-2">
			{items.map((item) => (
				<li key={item.id}>
					<MiniCartListItem key={item.id} item={item} onNavigate={onNavigate} />
				</li>
			))}
		</ul>
	);
}
