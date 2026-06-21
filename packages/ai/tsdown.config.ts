import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["./src/index.ts"],
	format: ["esm"],
	platform: "node",
	dts: true,
	tsconfig: "./tsconfig.schemas.json",
	deps: {
		neverBundle: ["@epoch-labs/db", "ai", "@ai-sdk/google"],
	},
});
