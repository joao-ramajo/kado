import { InboxOutlined, Search } from "@mui/icons-material";
import {
	Box,
	Button,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { instance } from "../../../api/instance";
import { useDownloadExpensesCsv } from "../hooks/useDownloadExpensesCsv";
import { downloadExpensesXlsx } from "../hooks/useDownloadExpensesXlsx";
import { type Expense, useGetExpensesQuery } from "../hooks/useGetExpense";
import { ErrorState } from "./ErrorState";
import { ExpenseItem } from "./ExpenseItem";
import { ExpenseItemSkeleton } from "./ExpenseItemSkeleton";
import { RecentExpensesActions } from "./RecentExpensesActions";
import { RecentExpensesFilter } from "./RecentExpensesFilter";

const EmptyState = () => {
	return (
		<Paper
			elevation={0}
			sx={{
				p: { xs: 4, sm: 6 },
				border: "2px dashed",
				borderColor: "divider",
				borderRadius: 3,
				textAlign: "center",
			}}
		>
			<InboxOutlined
				sx={{
					fontSize: { xs: 64, sm: 80 },
					color: "text.secondary",
					opacity: 0.3,
					mb: 2,
				}}
			/>
			<Typography
				variant="h6"
				color="text.secondary"
				gutterBottom
				sx={{ fontWeight: 600 }}
			>
				Nenhuma despesa registrada
			</Typography>
			<Typography
				variant="body2"
				color="text.secondary"
				sx={{ mb: 3, maxWidth: 400, mx: "auto" }}
			>
				Comece a organizar suas finanças criando sua primeira despesa ou
				importando dados de um arquivo CSV.
			</Typography>
			<Button variant="contained" size="large">
				Criar primeira despesa
			</Button>
		</Paper>
	);
};

export function RecentExpenses() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [queryInput, setQueryInput] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [isImporting, setIsImporting] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const statusFilter =
		(searchParams.get("status") as "all" | "paid" | "pending") ?? "all";

	const handleStatusChange = (value: "all" | "paid" | "pending") => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);
			params.set("status", value);
			return params;
		});
	};
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedQuery(queryInput.trim());
		}, 400);

		return () => clearTimeout(timeoutId);
	}, [queryInput]);

	const { data, isLoading, isError, refetch } = useGetExpensesQuery(
		statusFilter,
		debouncedQuery,
	);
	const hasData = !!data?.length;
	const total = data ? data.length : 0;

	const importExpensesCsv = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		try {
			setIsImporting(true);
			await instance.post("/dashboard/spreadsheet/csv/import", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			toast.success("Backup importado com sucesso");
			await refetch();
		} catch (_error) {
			toast.error("Erro ao importar backup");
		} finally {
			setIsImporting(false);
			event.target.value = "";
		}
	};

	return (
		<>
			<input
				ref={fileInputRef}
				type="file"
				accept=".csv"
				onChange={handleFileChange}
				style={{ display: "none" }}
			/>
			<RecentExpensesActions
				hasData={hasData}
				isLoading={isLoading}
				isImporting={isImporting}
				total={total ?? 0}
				downloadExpensesCsv={useDownloadExpensesCsv}
				downloadExpensesXlsx={downloadExpensesXlsx}
				importExpensesCsv={importExpensesCsv}
			/>
			<RecentExpensesFilter
				value={statusFilter}
				onChange={handleStatusChange}
			/>
			<TextField
				fullWidth
				label="Buscar despesas"
				placeholder="Digite para filtrar por descrição, categoria ou fonte"
				value={queryInput}
				onChange={(e) => setQueryInput(e.target.value)}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<Search fontSize="small" />
							</InputAdornment>
						),
					},
				}}
				sx={{ mt: 2 }}
			/>
			<Box mb={3} />
			{/* Loading State */}
			{isLoading && (
				<Stack spacing={2}>
					<ExpenseItemSkeleton />
					<ExpenseItemSkeleton />
					<ExpenseItemSkeleton />
				</Stack>
			)}

			{/* Error State */}
			{isError && !isLoading && <ErrorState onRetry={refetch} />}

			{/* Empty State */}
			{!isLoading && !isError && !hasData && <EmptyState />}

			{/* Data State */}
			{!isLoading && !isError && hasData && data.length > 0 && (
				<Stack spacing={2}>
					{data.map((expense: Expense) => (
						<ExpenseItem key={expense.id} expense={expense} />
					))}
				</Stack>
			)}
		</>
	);
}
