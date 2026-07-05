import { z } from "zod";

export const categorySchema = z.object({
	id: z.string(),
	parentId: z.string().nullable(),
	name: z.string(),
	slug: z.string(),
	path: z.string(),
	level: z.number().int(),
	position: z.number().int(),
	isLeaf: z.boolean(),
	imageUrl: z.string().nullable(),
	iconUrl: z.string().nullable(),
});

export type Category = z.infer<typeof categorySchema>;

export type CategoryNode = Category & { children: CategoryNode[] };

export const categoryNodeSchema: z.ZodType<CategoryNode> = z.lazy(() =>
	categorySchema.extend({
		children: z.array(categoryNodeSchema),
	}),
);
