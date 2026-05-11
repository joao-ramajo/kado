import { z } from "zod";

export const createExpenseSchema = z.object({
	title: z.string().min(1, "A descrição é obrigatória"),
	amount: z
		.number()
		.int("Valor inválido")
		.positive("Valor deve ser maior que zero"),
	type: z.enum(["income", "expense"]),
	status: z.enum(["paid", "pending", "overdue"]),
	payment_date: z.string().nullable().optional(),
	purchase_date: z.string().nullable().optional(),
	installment_total: z
		.number()
		.int("Quantidade de parcelas inválida")
		.min(1, "Parcela mínima é 1x")
		.max(24, "Máximo de 24 parcelas")
		.optional(),
	category_id: z.number().nullable().optional(),
	source_id: z.number().nullable().optional(),
});

export type CreateExpenseFormData = z.infer<typeof createExpenseSchema>;
