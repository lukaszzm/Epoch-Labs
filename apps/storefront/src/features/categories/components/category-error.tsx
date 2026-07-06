import { WarningCircleIcon } from "@phosphor-icons/react";
import { BackButton } from "@/components/ui/back-button";
import { Container } from "@/components/ui/container";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export function CategoryError() {
	return (
		<Container>
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<WarningCircleIcon />
					</EmptyMedia>
					<EmptyTitle>Something went wrong</EmptyTitle>
					<EmptyDescription>We couldn't load this category. Please try again later.</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<BackButton variant="outline" size="lg">
						Go Back
					</BackButton>
				</EmptyContent>
			</Empty>
		</Container>
	);
}
