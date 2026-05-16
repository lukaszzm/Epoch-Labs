import "dotenv/config";

import { getEnvVariable } from "@db/utils/get-env-variable";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: getEnvVariable("DATABASE_URL"),
	},
});
