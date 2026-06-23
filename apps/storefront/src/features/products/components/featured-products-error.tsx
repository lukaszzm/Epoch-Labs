import { WarningIcon } from "@phosphor-icons/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/alert";

export function FeaturedProductsError() {
	return (
		<Alert variant="destructive">
			<WarningIcon className="size-6" />
			<AlertTitle>Failed to load featured products</AlertTitle>
			<AlertDescription>The featured products could not be loaded. Please try again later.</AlertDescription>
		</Alert>
	);
}
