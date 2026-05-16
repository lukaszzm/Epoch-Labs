import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

function getEnvVariable(name: string): string {
	const envVar = process.env[name];

	if (!envVar) {
		throw new Error(`Environment variable ${name} is not set`);
	}

	return envVar;
}

const DATABASE_URL = getEnvVariable("DATABASE_URL");

export const db = drizzle(DATABASE_URL);
