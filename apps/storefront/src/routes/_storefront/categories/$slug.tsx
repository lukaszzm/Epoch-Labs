import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/container";

export const Route = createFileRoute("/_storefront/categories/$slug")({
	component: CategoryPage,
});

function CategoryPage() {
	return <Container>Category Page - slug: {Route.useParams().slug}</Container>;
}
