import { z } from "zod";

export const createSourceSchema = z.object({
	name: z.string(),
	color: z.string(),
	allow_negative: z.boolean(),
});

export type CreateSourceFormData = z.infer<typeof createSourceSchema>;
