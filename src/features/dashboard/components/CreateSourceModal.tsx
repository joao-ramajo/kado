import { Close } from "@mui/icons-material";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	FormHelperText,
	IconButton,
	Slide,
	Switch,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import dayjs, { type Dayjs } from "dayjs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import type { LaravelValidationError } from "../../../api/instance";
import { useCreateSourceMutation } from "../hooks/useCreateSourceMutation";
import { createSourceSchema } from "../schemas/createSource.schema";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children: React.ReactElement },
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const PRESET_COLORS = [
	"#ef4444",
	"#f59e0b",
	"#eab308",
	"#10b981",
	"#06b6d4",
	"#3b82f6",
	"#8b5cf6",
	"#ec4899",
	"#64748b",
	"#78716c",
];

const toDayPickerValue = (day: string) => {
	if (!day) return null;

	return dayjs().date(Number(day));
};

type CreateSourceModalProps = {
	open: boolean;
	onClose: () => void;
};

export function CreateSourceModal({ open, onClose }: CreateSourceModalProps) {
	const [name, setName] = useState("");
	const [sourceType, setSourceType] = useState<"cash_like" | "credit_card">(
		"cash_like",
	);
	const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
	const [allowNegative, setAllowNegative] = useState(false);
	const [creditLimitDisplay, setCreditLimitDisplay] = useState("");
	const [creditLimit, setCreditLimit] = useState<number | null>(null);
	const [statementClosingDay, setStatementClosingDay] = useState("");
	const [statementDueDay, setStatementDueDay] = useState("");
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});

	const { mutateAsync, isPending: isLoading } = useCreateSourceMutation();
	const queryClient = useQueryClient();

	function handleCreditLimitChange(value: string) {
		const numeric = value.replace(/\D/g, "");
		const cents = Number(numeric || 0);

		setCreditLimit(cents || null);
		setCreditLimitDisplay(
			cents
				? (cents / 100).toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})
				: "",
		);
	}

	function handleClose() {
		setName("");
		setSourceType("cash_like");
		setSelectedColor(PRESET_COLORS[0]);
		setAllowNegative(false);
		setCreditLimitDisplay("");
		setCreditLimit(null);
		setStatementClosingDay("");
		setStatementDueDay("");
		setFormErrors({});
		onClose();
	}

	function handleSubmit(e: React.SubmitEvent) {
		e.preventDefault();

		const parsed = createSourceSchema.safeParse({
			name,
			type: sourceType,
			color: selectedColor,
			allow_negative: sourceType === "credit_card" ? false : allowNegative,
			credit_limit: sourceType === "credit_card" ? creditLimit : null,
			statement_closing_day:
				sourceType === "credit_card" && statementClosingDay
					? Number(statementClosingDay)
					: null,
			statement_due_day:
				sourceType === "credit_card" && statementDueDay
					? Number(statementDueDay)
					: null,
		});

		if (!parsed.success) {
			const nextErrors = Object.fromEntries(
				parsed.error.issues.map((issue) => [
					String(issue.path[0]),
					issue.message,
				]),
			);
			setFormErrors(nextErrors);
			return;
		}

		setFormErrors({});

		mutateAsync(parsed.data, {
			onSuccess: (response) => {
				toast.success(response.message);
				queryClient.invalidateQueries({
					queryKey: ["dashboard-sources"],
				});
				queryClient.invalidateQueries({
					queryKey: ["user-sources"],
				});
				handleClose();
			},
			onError: (error: AxiosError<LaravelValidationError>) => {
				const status = error.response?.status;
				const apiError = error.response?.data;

				if (apiError?.message && status === 400) {
					toast.error(apiError.message);
				} else {
					toast.error("Erro inesperado");
				}
			},
		});
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth
			maxWidth="sm"
			TransitionComponent={Transition}
			PaperProps={{ sx: { borderRadius: 2 } }}
		>
			<form onSubmit={handleSubmit}>
				<DialogTitle
					sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
				>
					<Typography fontWeight={700} variant="h6">
						Nova fonte
					</Typography>
					<IconButton onClick={handleClose} size="small">
						<Close />
					</IconButton>
				</DialogTitle>

				<DialogContent
					sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}
				>
					<Box>
						<Typography
							variant="body2"
							sx={{ mb: 1.5, fontWeight: 500, color: "text.secondary" }}
						>
							Tipo de fonte
						</Typography>
						<ToggleButtonGroup
							value={sourceType}
							exclusive
							fullWidth
							onChange={(_, value) => {
								if (!value) return;

								setSourceType(value);
								setFormErrors({});
								if (value === "credit_card") {
									setAllowNegative(false);
								}
							}}
						>
							<ToggleButton value="cash_like">Conta de caixa</ToggleButton>
							<ToggleButton value="credit_card">Cartão de crédito</ToggleButton>
						</ToggleButtonGroup>
					</Box>

					<TextField
						label="Nome da fonte"
						placeholder="Ex: Conta Principal, Vale, Cartão..."
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						fullWidth
						autoFocus
						error={!!formErrors.name}
						helperText={formErrors.name}
						sx={{
							"& .MuiOutlinedInput-root": { borderRadius: 2 },
						}}
					/>

					{sourceType === "cash_like" ? (
						<FormControlLabel
							control={
								<Switch
									checked={allowNegative}
									onChange={(e) => setAllowNegative(e.target.checked)}
								/>
							}
							label="Permitir saldo negativo"
						/>
					) : (
						<Box
							sx={{
								p: 2,
								borderRadius: 2,
								bgcolor: "warning.50",
								border: "1px solid",
								borderColor: "warning.200",
							}}
						>
							<Typography variant="body2" sx={{ color: "text.secondary" }}>
								Compras no cartão não usam saldo negativo. O controle passa a
								ser por limite, fechamento e vencimento.
							</Typography>
						</Box>
					)}

					{sourceType === "credit_card" && (
						<Box sx={{ display: "grid", gap: 2 }}>
							<TextField
								label="Limite do cartão"
								value={creditLimitDisplay}
								onChange={(e) => handleCreditLimitChange(e.target.value)}
								placeholder="R$ 0,00"
								inputMode="numeric"
								error={!!formErrors.credit_limit}
								helperText={formErrors.credit_limit}
								fullWidth
							/>
							<Box
								sx={{
									display: "grid",
									gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
									gap: 2,
								}}
							>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label="Dia de fechamento"
										format="DD"
										views={["day"]}
										openTo="day"
										value={toDayPickerValue(statementClosingDay)}
										onChange={(value: Dayjs | null) => {
											setStatementClosingDay(
												value ? String(value.date()).padStart(2, "0") : "",
											);
										}}
										slotProps={{
											textField: {
												fullWidth: true,
												error: !!formErrors.statement_closing_day,
												helperText: formErrors.statement_closing_day,
											},
										}}
									/>
								</LocalizationProvider>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label="Dia de vencimento"
										format="DD"
										views={["day"]}
										openTo="day"
										value={toDayPickerValue(statementDueDay)}
										onChange={(value: Dayjs | null) => {
											setStatementDueDay(
												value ? String(value.date()).padStart(2, "0") : "",
											);
										}}
										slotProps={{
											textField: {
												fullWidth: true,
												error: !!formErrors.statement_due_day,
												helperText: formErrors.statement_due_day,
											},
										}}
									/>
								</LocalizationProvider>
							</Box>
							<FormHelperText>
								Exemplo: fechamento dia 5, vencimento dia 10.
							</FormHelperText>
						</Box>
					)}

					<Box>
						<Typography
							variant="body2"
							sx={{ mb: 1.5, fontWeight: 500, color: "text.secondary" }}
						>
							Escolha uma cor
						</Typography>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(5, 1fr)",
								gap: 1.5,
							}}
						>
							{PRESET_COLORS.map((color) => (
								<Box
									key={color}
									onClick={() => setSelectedColor(color)}
									sx={{
										width: "100%",
										aspectRatio: "1",
										bgcolor: color,
										borderRadius: 2,
										cursor: "pointer",
										border: 3,
										borderColor:
											selectedColor === color
												? "background.paper"
												: "transparent",
										outline:
											selectedColor === color ? `2px solid ${color}` : "none",
										outlineOffset: 2,
										transition: "all 0.2s",
										"&:hover": {
											transform: "scale(1.1)",
											boxShadow: `0 4px 12px ${color}60`,
										},
									}}
								/>
							))}
						</Box>

						<Box
							sx={{
								mt: 3,
								p: 2,
								border: 1,
								borderColor: "divider",
								borderRadius: 2,
								bgcolor: "action.hover",
							}}
						>
							<Typography
								variant="caption"
								sx={{ color: "text.secondary", mb: 1 }}
							>
								Preview:
							</Typography>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
								<Box
									sx={{
										width: 32,
										height: 32,
										borderRadius: 1.5,
										bgcolor: `${selectedColor}20`,
										border: `2px solid ${selectedColor}`,
									}}
								/>
								<Typography sx={{ fontWeight: 600 }}>
									{name ||
										(sourceType === "credit_card"
											? "Novo cartão"
											: "Nome da fonte")}
								</Typography>
							</Box>
						</Box>
					</Box>
				</DialogContent>

				<DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
					<Button
						onClick={handleClose}
						disabled={isLoading}
						sx={{ textTransform: "none", borderRadius: 2, px: 3 }}
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={!name.trim()}
						sx={{
							textTransform: "none",
							borderRadius: 2,
							px: 3,
							bgcolor: selectedColor,
							"&:hover": { bgcolor: selectedColor, filter: "brightness(0.9)" },
						}}
					>
						Criar fonte
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
