/**
 * Attribute keys are often in snake_case or camelCase, which can be hard to read for humans.
 * This function converts them into a more human-readable format by replacing underscores and camelCase with spaces and capitalizing the first letter of each word.
 *
 * @param key - The attribute key to humanize.
 * @returns A human-readable string.
 */
export function formatAttributeKey(key: string): string {
	const formattedKey = key
		// Replace underscores with spaces
		.replace(/_/g, " ")
		// Replace camelCase with spaces
		.replace(/([a-z])([A-Z])/g, "$1 $2");

	// Capitalize the first letter of first word
	return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
}
