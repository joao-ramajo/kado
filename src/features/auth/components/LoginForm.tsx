import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Checkbox,
	Container,
	FormControlLabel,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { LaravelValidationError } from "../../../api/instance";
import { FormButton } from "../../../components/form/FormButton";
import { PasswordInput } from "../../../components/form/PasswordInput";
import { useAuth } from "../context/AuthContext";
import { useLoginMutation } from "../hooks/useLogin";
import { type LoginFormData, loginSchema } from "../schemas/login.schema";

export function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const navigate = useNavigate();

	const { mutateAsync, isPending } = useLoginMutation();
	const { login } = useAuth();

	async function onSubmit(data: LoginFormData) {
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
						setError(field as keyof LoginFormData, {
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
						Entrar
					</Typography>

					<TextField
						label="Email"
						type="email"
						fullWidth
						{...register("email")}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>

					<PasswordInput<LoginFormData>
						label="Senha"
						name="password"
						register={register}
						error={errors.password?.message}
					/>

					<FormControlLabel
						control={<Checkbox {...register("remember")} />}
						label="Lembrar-me"
					/>
					{errors.remember && (
						<Typography color="error" variant="body2">
							{errors.remember.message}
						</Typography>
					)}

					<FormButton
						type="submit"
						variant="contained"
						fullWidth
						isLoading={isPending}
					>
						Entrar
					</FormButton>

					<Typography variant="body2" align="center">
						Não tem login? <Link href="/cadastre-se">Cadastre-se</Link>
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}
