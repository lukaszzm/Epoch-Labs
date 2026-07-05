import { z } from "zod";
import { type Category, categorySchema } from "@/features/categories/schemas/category-schema";

export type CategoryNode = Category & { children: CategoryNode[] };

export const categoryNodeSchema: z.ZodType<CategoryNode> = z.lazy(() =>
	categorySchema.extend({
		children: z.array(categoryNodeSchema),
	}),
);
