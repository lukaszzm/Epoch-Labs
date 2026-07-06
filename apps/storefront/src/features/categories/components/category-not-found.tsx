import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { BackButton } from "@/components/ui/back-button";
import { Container } from "@/components/ui/container";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export function CategoryNotFound() {
	return (
		<Container>
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<MagnifyingGlassIcon />
					</EmptyMedia>
					<EmptyTitle>Category not found</EmptyTitle>
					<EmptyDescription>
						We couldn't find this category. Check the URL or browse all categories from the menu.
					</EmptyDescription>
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
