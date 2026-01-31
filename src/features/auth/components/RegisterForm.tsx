import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Checkbox,
	Container,
	FormControlLabel,
	TextField,
	Typography,
} from "@mui/material";

import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import type { LaravelValidationError } from "../../../api/instance";
import { FormButton } from "../../../components/form/FormButton";
import { PasswordInput } from "../../../components/form/PasswordInput";
import { useAuth } from "../context/AuthContext";
import { useRegisterMutation } from "../hooks/useRegister";
import {
	type RegisterFormData,
	registerSchema,
} from "../schemas/register.schema";

export function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const navigate = useNavigate();

	const { mutateAsync, isPending } = useRegisterMutation();
	const { login } = useAuth();

	async function onSubmit(data: RegisterFormData) {
		await mutateAsync(data, {
			onSuccess: (response) => {
				toast.success(response.message);
				login(response);
				navigate("/");
			},
			onError: (error: AxiosError<LaravelValidationError>) => {
				const status = error.response?.status;
				const apiError = error.response?.data;

				if (status === 422 && apiError?.errors) {
					Object.entries(apiError.errors).forEach(([field, messages]) => {
						setError(field as keyof RegisterFormData, {
							type: "server",
							message: messages[0],
						});
					});
				} else if (apiError?.message && status === 400) {
					toast.error(apiError.message);
				} else {
					toast.error("Erro inesperado");
				}
			},
		});
	}

	return (
		<Box component="form" sx={{ py: 10 }} onSubmit={handleSubmit(onSubmit)}>
			<Container maxWidth="xs">
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
					}}
				>
					<Typography variant="h4" align="center">
						Criar conta
					</Typography>

					<TextField
						label="Nome"
						{...register("name")}
						error={!!errors.name}
						helperText={errors.name?.message}
						fullWidth
					/>

					<TextField
						label="Email"
						{...register("email")}
						error={!!errors.email}
						helperText={errors.email?.message}
						fullWidth
					/>

					<PasswordInput<RegisterFormData>
						label="Senha"
						name="password"
						register={register}
						error={errors.password?.message}
					/>

					<PasswordInput<RegisterFormData>
						label="Confirmar senha"
						name="password_confirmation"
						register={register}
						error={errors.password_confirmation?.message}
					/>

					<FormControlLabel
						control={<Checkbox {...register("terms")} />}
						label="Aceito os termos e condições"
					/>
					{errors.terms && (
						<Typography color="error" variant="body2">
							{errors.terms.message}
						</Typography>
					)}
					<FormButton
						type="submit"
						variant="contained"
						fullWidth
						isLoading={isPending}
					>
						Cadastrar
					</FormButton>

					<Typography variant="body2" align="center">
						Já tem conta? <Link to="/login">Entrar</Link>
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}
