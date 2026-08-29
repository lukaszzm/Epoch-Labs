const DEFAULT_SEPARATOR_LENGTH = 60;

export function printSeparator(length: number = DEFAULT_SEPARATOR_LENGTH): void {
	const separator = "─".repeat(length);
	console.log(`\n${separator}\n`);
}
