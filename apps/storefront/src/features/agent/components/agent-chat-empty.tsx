import { ApertureIcon } from "@phosphor-icons/react";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export function AgentChatEmpty() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<ApertureIcon className="size-8 text-primary opacity-80" />
				</EmptyMedia>
				<EmptyTitle>No messages yet</EmptyTitle>
				<EmptyDescription>Ask me to find products, manage your cart, or help with checkout.</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
