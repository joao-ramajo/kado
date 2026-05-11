import { z } from "zod";

export const createSourceSchema = z
	.object({
		name: z.string(),
		type: z.enum(["cash_like", "credit_card"]),
		color: z.string(),
		allow_negative: z.boolean(),
		credit_limit: z.number().int().positive().nullable().optional(),
		statement_closing_day: z
			.number()
			.int()
			.min(1)
			.max(31)
			.nullable()
			.optional(),
		statement_due_day: z.number().int().min(1).max(31).nullable().optional(),
	})
	.superRefine((value, context) => {
		if (value.type !== "credit_card") {
			return;
		}

		if (!value.credit_limit) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["credit_limit"],
				message: "O limite é obrigatório para cartão.",
			});
		}

		if (!value.statement_closing_day) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["statement_closing_day"],
				message: "O dia de fechamento é obrigatório.",
			});
		}

		if (!value.statement_due_day) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["statement_due_day"],
				message: "O dia de vencimento é obrigatório.",
			});
		}

		if (
			value.statement_closing_day &&
			value.statement_due_day &&
			value.statement_due_day <= value.statement_closing_day
		) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["statement_due_day"],
				message: "O vencimento deve ser após o fechamento.",
			});
		}
	});

export type CreateSourceFormData = z.infer<typeof createSourceSchema>;
