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
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { LaravelValidationError } from "../../../api/instance";
import { useGetCategoryListQuery } from "../hooks/useGetCategoryListQuery";
import type { Expense } from "../hooks/useGetExpense";
import { useGetSourceQuery } from "../hooks/useGetSourceListQuery";
import {
	type UpdateExpenseResponse,
	useUpdateExpenseMutation,
} from "../hooks/useUpdateExpenseMutation";
import {
	type UpdateExpenseFormData,
	updateExpenseSchema,
} from "../schemas/updateExpense.schema";
import { CategoriesSelect } from "./CategoriesSelect";
import { SourcesSelect } from "./SourcesSelect";

type EditExpenseModalProps = {
	open: boolean;
	onClose: () => void;
	expense?: Expense;
};

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children: React.ReactElement },
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export function EditExpenseModal({
	open,
	onClose,
	expense,
}: EditExpenseModalProps) {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
		control,
		setError,
	} = useForm<UpdateExpenseFormData>({
		resolver: zodResolver(updateExpenseSchema),
		defaultValues: {
			id: 0,
			category_id: null,
			source_id: null,
		},
	});

	const [amountDisplay, setAmountDisplay] = useState("");
	const type = watch("type");
	const status = watch("status");

	const { mutateAsync, isPending: isLoading } = useUpdateExpenseMutation();
	const { data } = useGetCategoryListQuery();
	const { data: sourceListData } = useGetSourceQuery();
	const queryClient = useQueryClient();

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
		if (!expense) return;

		setValue("id", expense.id);
		setValue("title", expense.title);
		setValue("type", expense.type);
		setValue("status", expense.status);

		setValue("amount", expense.amount);
		setValue("category_id", expense.category_id ?? null);
		setValue("source_id", expense.source_id ?? null);

		const formatted = (expense.amount / 100).toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});

		setAmountDisplay(formatted);
	}, [expense, setValue]);

	function onSubmit(data: UpdateExpenseFormData) {
		mutateAsync(data, {
			onSuccess: (response: UpdateExpenseResponse) => {
				toast.success(response.message);
				queryClient.invalidateQueries({
					queryKey: ["dashboard-expenses"],
				});
				queryClient.invalidateQueries({
					queryKey: ["dashboard-summary"],
				});
				handleClose();
			},
			onError: (error: AxiosError<LaravelValidationError>) => {
				const status = error.response?.status;
				const apiError = error.response?.data;

				if (status === 422 && apiError?.errors) {
					Object.entries(apiError.errors).forEach(([field, messages]) => {
						setError(field as keyof UpdateExpenseFormData, {
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
			TransitionComponent={Transition}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}> */}
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
						placeholder="R$ 0,00"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AttachMoney />
								</InputAdornment>
							),
						}}
						error={!!errors.amount}
						helperText={errors.amount?.message}
					/>

					{/* Status */}
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
								value={field.value ?? null}
								onChange={field.onChange}
								sources={sourceListData || []}
							/>
						)}
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} disabled={isLoading}>
						Cancelar
					</Button>
					<Button type="submit" variant="contained" loading={isLoading}>
						Salvar
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
