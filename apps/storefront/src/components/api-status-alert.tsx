import { CheckIcon, XIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export const getServerHealth = createServerFn().handler(async () => {
	const url = `${import.meta.env.VITE_API_URL}/health`;
	const response = await fetch(url);

	if (!response.ok) {
		return false;
	}

	const data = await response.json();
	return data.status === "ok";
});

export function ApiStatusAlert(): React.ReactNode {
	const getHealth = useServerFn(getServerHealth);

	const { data, isLoading } = useQuery({
		queryKey: ["health"],
		queryFn: getHealth,
	});

	if (isLoading) {
		return <Skeleton className="h-18 w-full" />;
	}

	const isHealthy = data === true;

	if (!isHealthy) {
		return (
			<Alert variant="destructive">
				<XIcon />
				<AlertTitle>API Health Check Failed</AlertTitle>
				<AlertDescription>
					Unable to reach the API. Please check your connection and try again.
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<Alert>
			<CheckIcon />
			<AlertTitle>API Health Check Passed</AlertTitle>
			<AlertDescription>The API is functioning correctly.</AlertDescription>
		</Alert>
	);
}
