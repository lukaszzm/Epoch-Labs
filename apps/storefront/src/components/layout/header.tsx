import { Logo } from "@/components/ui/logo";
import { MiniCart } from "@/features/cart/components/mini-cart";
import { CategoryMenu } from "@/features/categories/components/category-menu";
import { CategoryMobileMenu } from "@/features/categories/components/category-mobile-menu";

export function Header() {
	return (
		<header className="border-b border-border bg-background fixed top-0 left-0 right-0 z-50">
			<div className="xl:container flex items-center justify-between py-4 px-2 mx-auto">
				<div className="flex items-center gap-1">
					<CategoryMobileMenu />
					<Logo />
				</div>
				<CategoryMenu />
				<div className="flex items-center gap-1">
					<MiniCart />
				</div>
			</div>
		</header>
	);
}
