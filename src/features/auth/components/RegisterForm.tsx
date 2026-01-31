import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	TextField,
	Typography,
} from "@mui/material";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import type { ApiError } from "../../../api/instance";
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

	const registerMutation = useRegisterMutation();

	function onSubmit(data: RegisterFormData) {
		console.log("dados válidos:", data);

		registerMutation.mutate(data, {
			onError: (error: AxiosError<ApiError>) => {
				const status = error.response?.status;

				const apiError = error.response?.data;

				if (status === 400 && apiError?.errors) {
					apiError.errors.forEach((err) => {
						setError(err.input as keyof RegisterFormData, {
							type: "server",
							message: err.message,
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

					<TextField
						label="Senha"
						type="password"
						{...register("password")}
						error={!!errors.password}
						helperText={errors.password?.message}
						fullWidth
					/>

					<TextField
						label="Confirmar senha"
						type="password"
						{...register("password_confirmation")}
						error={!!errors.password_confirmation}
						helperText={errors.password_confirmation?.message}
						fullWidth
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
					<Button type="submit" variant="contained" fullWidth>
						Cadastrar
					</Button>

					<Typography variant="body2" align="center">
						Já tem conta? <Link to="/login">Entrar</Link>
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}
