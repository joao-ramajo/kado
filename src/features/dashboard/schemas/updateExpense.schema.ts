import { z } from "zod";

export const updateExpenseSchema = z.object({
	id: z.number().optional(),
	title: z.string().min(1, "A descrição é obrigatória"),
	amount: z
		.number()
		.int("Valor inválido")
		.positive("Valor deve ser maior que zero"),
	type: z.enum(["income", "expense"]),
	status: z.enum(["paid", "pending", "overdue"]),
	payment_date: z.string().nullable().optional(),
	category_id: z.number().nullable().optional(),
	source_id: z.number().nullable().optional(),
});

export type UpdateExpenseFormData = z.infer<typeof updateExpenseSchema>;
