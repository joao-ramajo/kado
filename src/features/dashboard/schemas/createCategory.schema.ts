import { z } from "zod";

export const createCategorySchema = z.object({
	name: z.string(),
	color: z.string(),
});

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;
