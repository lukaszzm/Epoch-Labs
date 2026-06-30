import { WarningCircleIcon } from "@phosphor-icons/react";
import { BackButton } from "@/components/back-button";
import { Container } from "@/components/container";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/empty";

export function ProductError() {
	return (
		<Container>
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<WarningCircleIcon />
					</EmptyMedia>
					<EmptyTitle>Something went wrong</EmptyTitle>
					<EmptyDescription>We couldn't load this product. Please try again later.</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<BackButton fallbackTo="/" variant="outline" size="lg">
						Go Back
					</BackButton>
				</EmptyContent>
			</Empty>
		</Container>
	);
}
