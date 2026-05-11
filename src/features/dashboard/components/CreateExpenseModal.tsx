import { zodResolver } from "@hookform/resolvers/zod";
import {
	AttachMoney,
	CheckCircle,
	Close,
	Schedule,
	TrendingDown,
	TrendingUp,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormLabel,
	IconButton,
	InputAdornment,
	Slide,
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
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { LaravelValidationError } from "../../../api/instance";
import {
	type CreateExpenseResponse,
	useCreateExpenseMutation,
} from "../hooks/useCreateExpense";
import { useGetCategoryListQuery } from "../hooks/useGetCategoryListQuery";
import { useGetSourceQuery } from "../hooks/useGetSourceListQuery";
import {
	type CreateExpenseFormData,
	createExpenseSchema,
} from "../schemas/createExpense.schema";
import { CategoriesSelect } from "./CategoriesSelect";
import { SourcesSelect } from "./SourcesSelect";

type CreateExpenseModalProps = {
	open: boolean;
	onClose: () => void;
};

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children: React.ReactElement },
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const getCurrentDateIso = () => {
	const now = new Date();
	const day = String(now.getDate()).padStart(2, "0");
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const year = now.getFullYear();
	return `${year}-${month}-${day}`;
};

const toBackendDate = (value: string | null | undefined) => {
	if (!value) return null;

	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
		return value;
	}

	const match = value.match(/^(\d{2})-(\d{2})-(\d{4})$/);
	if (!match) return null;
	const [, day, month, year] = match;

	return `${year}-${month}-${day}`;
};

export function CreateExpenseModal({ open, onClose }: CreateExpenseModalProps) {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
		control,
		setError,
	} = useForm<CreateExpenseFormData>({
		resolver: zodResolver(createExpenseSchema),
		defaultValues: {
			type: "expense",
			status: "pending",
			payment_date: null,
			purchase_date: null,
			installment_total: 1,
			category_id: null,
			source_id: null,
		},
	});

	const [amountDisplay, setAmountDisplay] = useState("");

	const type = watch("type");
	const status = watch("status");
	const amount = watch("amount");
	const paymentDate = watch("payment_date");
	const purchaseDate = watch("purchase_date");
	const sourceId = watch("source_id");
	const installmentTotal = watch("installment_total");

	const { mutateAsync, isPending: isLoading } = useCreateExpenseMutation();
	const { data } = useGetCategoryListQuery();
	const queryClient = useQueryClient();
	const { data: sourceDataList } = useGetSourceQuery();

	const defaultCashSource =
		sourceDataList?.find((s) => s.is_default && s.type === "cash_like") ??
		sourceDataList?.find((s) => s.type === "cash_like") ??
		null;
	const selectedSource =
		sourceDataList?.find((source) => source.id === sourceId) ??
		defaultCashSource;
	const isCreditCardSource = selectedSource?.type === "credit_card";
	const selectableSources =
		type === "income"
			? (sourceDataList || []).filter((source) => source.type === "cash_like")
			: sourceDataList || [];

	function handleAmountChange(value: string) {
		const numeric = value.replace(/\D/g, "");
		const cents = Number(numeric || 0);

		setValue("amount", cents);

		const formatted = (cents / 100).toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});

		setAmountDisplay(formatted);
	}

	useEffect(() => {
		if (!sourceDataList?.length) return;

		if (!sourceId) {
			setValue(
				"source_id",
				defaultCashSource?.id ?? sourceDataList[0]?.id ?? null,
			);
			return;
		}

		const currentSource = sourceDataList.find(
			(source) => source.id === sourceId,
		);

		if (!currentSource) {
			setValue(
				"source_id",
				defaultCashSource?.id ?? sourceDataList[0]?.id ?? null,
			);
			return;
		}

		if (type === "income" && currentSource.type === "credit_card") {
			setValue("source_id", defaultCashSource?.id ?? null);
		}
	}, [defaultCashSource, setValue, sourceDataList, sourceId, type]);

	useEffect(() => {
		if (isCreditCardSource) {
			setValue("type", "expense");
			setValue("status", "pending");
			setValue("payment_date", null);
			if (!purchaseDate) {
				setValue("purchase_date", getCurrentDateIso());
			}
			if (!installmentTotal) {
				setValue("installment_total", 1);
			}
			return;
		}

		setValue("purchase_date", null);
		setValue("installment_total", 1);

		if (status !== "paid") {
			setValue("payment_date", null);
			return;
		}

		if (!paymentDate) {
			setValue("payment_date", getCurrentDateIso());
		}
	}, [
		installmentTotal,
		isCreditCardSource,
		paymentDate,
		purchaseDate,
		setValue,
		status,
	]);

	function onSubmit(data: CreateExpenseFormData) {
		const normalizedData: CreateExpenseFormData = {
			...data,
			type: isCreditCardSource ? "expense" : data.type,
			status: isCreditCardSource ? "pending" : data.status,
			payment_date:
				!isCreditCardSource && data.status === "paid"
					? toBackendDate(data.payment_date)
					: null,
			purchase_date: isCreditCardSource
				? toBackendDate(data.purchase_date)
				: null,
			installment_total: isCreditCardSource ? (data.installment_total ?? 1) : 1,
		};

		mutateAsync(normalizedData, {
			onSuccess: (response: CreateExpenseResponse) => {
				queryClient.invalidateQueries({
					queryKey: ["dashboard-expenses"],
				});
				queryClient.invalidateQueries({
					queryKey: ["dashboard-summary"],
				});
				queryClient.invalidateQueries({
					queryKey: ["dashboard-sources"],
				});
				toast.success(response.message);
				handleClose();
			},
			onError: (error: AxiosError<LaravelValidationError>) => {
				const status = error.response?.status;
				const apiError = error.response?.data;

				if (status === 422 && apiError?.errors) {
					Object.entries(apiError.errors).forEach(([field, messages]) => {
						setError(field as keyof CreateExpenseFormData, {
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

	function handleClose() {
		reset();
		setAmountDisplay("");
		onClose();
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth
			maxWidth="sm"
			dashboard-summary
			TransitionComponent={Transition}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
					<Typography fontWeight={700}>Nova movimentação</Typography>
					<IconButton onClick={handleClose}>
						<Close />
					</IconButton>
				</DialogTitle>

				<DialogContent
					sx={{ display: "flex", flexDirection: "column", gap: 3 }}
				>
					{/* Tipo */}
					{!isCreditCardSource && (
						<>
							<FormLabel>Tipo</FormLabel>
							<ToggleButtonGroup
								value={type}
								exclusive
								onChange={(_, v) => v && setValue("type", v)}
								fullWidth
							>
								<ToggleButton value="expense">
									<TrendingDown sx={{ mr: 1 }} /> Despesa
								</ToggleButton>
								<ToggleButton value="income">
									<TrendingUp sx={{ mr: 1 }} /> Receita
								</ToggleButton>
							</ToggleButtonGroup>
						</>
					)}

					{isCreditCardSource && (
						<Box
							sx={{
								p: 2,
								borderRadius: 2,
								bgcolor: "info.50",
								border: "1px solid",
								borderColor: "info.200",
							}}
						>
							<Typography fontWeight={600} sx={{ mb: 0.5 }}>
								Compra no cartão
							</Typography>
							<Typography variant="body2" color="text.secondary">
								A compra entra na fatura do cartão e só afeta o caixa quando a
								fatura for paga.
							</Typography>
						</Box>
					)}

					{/* Título */}
					<TextField
						label="Descrição"
						fullWidth
						{...register("title")}
						error={!!errors.title}
						helperText={errors.title?.message}
					/>

					{/* Valor */}
					<TextField
						label="Valor"
						fullWidth
						value={amountDisplay}
						onChange={(e) => handleAmountChange(e.target.value)}
						inputMode="numeric"
						placeholder="R$ 0,00"
						slotProps={{
							input: {
								// Props do componente Input (substitui InputProps)
								startAdornment: (
									<InputAdornment position="start">
										<AttachMoney />
									</InputAdornment>
								),
							},
							htmlInput: {
								inputMode: "numeric",
							},
						}}
						error={!!errors.amount}
						helperText={errors.amount?.message}
					/>

					{!isCreditCardSource && (
						<>
							<FormLabel>Status</FormLabel>
							<ToggleButtonGroup
								value={status}
								exclusive
								onChange={(_, v) => v && setValue("status", v)}
								fullWidth
							>
								<ToggleButton value="paid">
									<CheckCircle sx={{ mr: 1 }} /> Pago
								</ToggleButton>
								<ToggleButton value="pending">
									<Schedule sx={{ mr: 1 }} /> Pendente
								</ToggleButton>
							</ToggleButtonGroup>
						</>
					)}

					{!isCreditCardSource && status === "paid" && (
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								label="Data de pagamento"
								format="DD/MM/YYYY"
								value={paymentDate ? dayjs(paymentDate) : null}
								onChange={(value: Dayjs | null) => {
									setValue(
										"payment_date",
										value ? value.format("YYYY-MM-DD") : null,
										{
											shouldValidate: true,
										},
									);
								}}
								slotProps={{
									textField: {
										fullWidth: true,
										error: !!errors.payment_date,
										helperText: errors.payment_date?.message,
									},
								}}
								disableFuture
							/>
						</LocalizationProvider>
					)}

					{isCreditCardSource && (
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
								gap: 2,
							}}
						>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									label="Data da compra"
									format="DD/MM/YYYY"
									value={purchaseDate ? dayjs(purchaseDate) : null}
									onChange={(value: Dayjs | null) => {
										setValue(
											"purchase_date",
											value ? value.format("YYYY-MM-DD") : null,
											{
												shouldValidate: true,
											},
										);
									}}
									slotProps={{
										textField: {
											fullWidth: true,
											error: !!errors.purchase_date,
											helperText: errors.purchase_date?.message,
										},
									}}
									disableFuture
								/>
							</LocalizationProvider>
							<TextField
								label="Parcelas"
								type="number"
								value={installmentTotal ?? 1}
								onChange={(event) =>
									setValue(
										"installment_total",
										Math.max(1, Number(event.target.value || 1)),
										{ shouldValidate: true },
									)
								}
								inputProps={{ min: 1, max: 24 }}
								error={!!errors.installment_total}
								helperText={errors.installment_total?.message ?? "Até 24x"}
							/>
						</Box>
					)}

					<Controller
						name="category_id"
						control={control}
						render={({ field }) => (
							<CategoriesSelect
								value={field.value ?? null}
								onChange={field.onChange}
								categories={data || []}
							/>
						)}
					/>

					<Controller
						name="source_id"
						control={control}
						render={({ field }) => (
							<SourcesSelect
								value={field.value ?? defaultCashSource?.id ?? null}
								onChange={field.onChange}
								sources={selectableSources}
							/>
						)}
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} disabled={isLoading}>
						Cancelar
					</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={!watch("title") || !amount}
						loading={isLoading}
					>
						{isCreditCardSource ? "Registrar compra" : "Salvar"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
