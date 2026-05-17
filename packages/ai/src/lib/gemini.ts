import "dotenv/config";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { EmbeddingModel, LanguageModel } from "ai";

const ai = createGoogleGenerativeAI({
	apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Gemini 3 Pro — primary language model for agent reasoning and tool calling.
 */
export const gemini3Pro: LanguageModel = ai("gemini-3-pro-preview");

/**
 * Gemini embedding-001 — primary embedding model for semantic search and matching.
 */
export const embeddingModel: EmbeddingModel = ai.embedding(
	"gemini-embedding-001",
);
