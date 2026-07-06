import { capitalize } from "@/utils/capitalize";

export function slugToLabel(slug: string): string {
	return capitalize(slug.replace(/-/g, " "));
}
