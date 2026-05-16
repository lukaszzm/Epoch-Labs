import "dotenv/config";

import { getEnvVariable } from "@db/utils/get-env-variable";
import { drizzle } from "drizzle-orm/node-postgres";

const DATABASE_URL = getEnvVariable("DATABASE_URL");

export const db = drizzle(DATABASE_URL);
