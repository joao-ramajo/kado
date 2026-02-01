import { z } from "zod";

export const createExpenseSchema = z.object({
	title: z.string().min(1, "A descrição é obrigatória"),
	amount: z
		.number()
		.int("Valor inválido")
		.positive("Valor deve ser maior que zero"),
	type: z.enum(["income", "expense"]),
	status: z.enum(["paid", "pending", "overdue"]),
	category_id: z.string().nullable(),
});

export type CreateExpenseFormData = z.infer<typeof createExpenseSchema>;
