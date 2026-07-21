import "dotenv/config";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { EmbeddingModel, LanguageModel, ImageModel } from "ai";

const ai = createGoogleGenerativeAI({
	apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Gemini 3 Pro — primary language model for agent reasoning and tool calling.
 */
export const geminiLanguage: LanguageModel = ai("gemini-3.1-flash-lite"); // Currently, changed to flash-lite for cost efficiency

/**
 * Gemini embedding-001 — primary embedding model for semantic search and matching.
 */
export const geminiEmbedding: EmbeddingModel = ai.embedding("gemini-embedding-001");

/**
 * Gemini 3.1 Flash Lite Image - primary image generation model for product images.
 */
export const geminiImage: ImageModel = ai.image("gemini-3.1-flash-lite-image");
