import { z } from "zod";

export const registerSchema = z
	.object({
		name: z.string().nonempty("Nome obrigatório"),
		email: z.string().email("Email inválido"),
		password: z.string().min(6, "Mínimo 6 caracteres"),
		password_confirmation: z.string().min(6, "Mínimo 6 caracteres"),
		terms: z.literal(true, "Aceite os termos para continuar."),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "As senhas não coincidem",
		path: ["password_confirmation"],
	});

export type RegisterFormData = z.infer<typeof registerSchema>;
