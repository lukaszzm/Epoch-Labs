import type { ApiRoute } from "@/config/api-routes";

type QueryParams = Record<string, string | number | boolean>;

function buildUrlSearchParams(queryParams: QueryParams): string {
	const params = new URLSearchParams();

	for (const [key, value] of Object.entries(queryParams)) {
		params.append(key, String(value));
	}

	return params.toString();
}

export function buildApiUrl(route: ApiRoute, queryParams?: QueryParams): string {
	const baseUrl = import.meta.env.VITE_API_URL;

	if (!baseUrl) {
		throw new Error("VITE_API_URL is not defined in the environment variables.");
	}

	let url = `${baseUrl}${route}`;

	if (queryParams) {
		const queryString = buildUrlSearchParams(queryParams);
		url += `?${queryString}`;
	}

	return url;
}
