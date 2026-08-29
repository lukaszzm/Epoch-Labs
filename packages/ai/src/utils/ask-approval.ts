import type * as readline from "node:readline/promises";

export async function askApproval(rl: readline.Interface): Promise<boolean> {
	const answer = await rl.question("Save this product to the database? [y/N]: ");
	const normalizedAnswer = answer.trim().toLowerCase();

	return normalizedAnswer === "y" || normalizedAnswer === "yes";
}
