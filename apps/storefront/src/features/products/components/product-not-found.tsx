import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { BackButton } from "@/components/ui/back-button";
import { Container } from "@/components/ui/container";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export function ProductNotFound() {
	return (
		<Container>
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<MagnifyingGlassIcon />
					</EmptyMedia>
					<EmptyTitle>Product not found</EmptyTitle>
					<EmptyDescription>
						We couldn't find this product. Check the URL or try searching for something else.
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
