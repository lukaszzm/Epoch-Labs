import { UserIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function CustomerProfile() {
	return (
		<Button variant="ghost" size="icon-xl">
			<UserIcon className="size-5" aria-hidden />
			<span className="sr-only">Customer Profile</span>
		</Button>
	);
}
