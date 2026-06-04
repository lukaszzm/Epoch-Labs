import z from "zod";

export const categoryListQuerySchema = z.object({
	tree: z.enum(["true", "false"]).optional().default("false"),
});
