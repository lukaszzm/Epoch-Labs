import { ListIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CategoryMobileMenuContent } from "@/features/categories/components/category-mobile-menu-content";

export function CategoryMobileMenu() {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon-xl" className="xl:hidden">
					<ListIcon className="size-5" aria-hidden />
					<span className="sr-only">Open categories menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-72 max-w-[80vw]">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<div className="overflow-y-auto flex-1 px-3 py-6">
					<CategoryMobileMenuContent onNavigate={() => setOpen(false)} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
