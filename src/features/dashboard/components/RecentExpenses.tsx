import { InboxOutlined } from "@mui/icons-material";
import {
	Box,
	Button,
	Container,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { instance } from "../../../api/instance";
import { useExpenseModalContext } from "../context/ExpenseModalContextProvider";
import { type Expense, useGetExpensesQuery } from "../hooks/useGetExpense";
import { ErrorState } from "./ErrorState";
import { ExpenseItem } from "./ExpenseItem";
import { ExpenseItemSkeleton } from "./ExpenseItemSkeleton";

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

export async function downloadExpensesCsv() {
	try {
		const response = await instance.get("/dashboard/spreadsheet/csv/export", {
			responseType: "blob",
		});

		// Pegar o nome do arquivo do header Content-Disposition (se disponível)
		const contentDisposition = response.headers["content-disposition"];
		let filename = "despesas.csv";

		if (contentDisposition) {
			const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
			if (filenameMatch?.[1]) {
				filename = filenameMatch[1];
			}
		}

		// Adicionar timestamp ao nome do arquivo
		const timestamp = new Date().toISOString().split("T")[0];
		filename = `despesas_${timestamp}.csv`;

		// Criar blob e fazer download
		const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
		const url = window.URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.style.display = "none";
		a.href = url;
		a.download = filename;

		document.body.appendChild(a);
		a.click();

		// Cleanup
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);

		return { success: true, filename };
	} catch (error) {
		console.error("Erro ao baixar CSV:", error);
		throw error;
	}
}

export function RecentExpenses() {
	const { data, isLoading, isError, refetch } = useGetExpensesQuery();

	const hasData = data && data.length > 0;
	const { selectAction } = useExpenseModalContext();

	return (
		<Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
			<Container maxWidth="lg">
				{/* Header */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: { xs: "flex-start", md: "center" },
						mb: { xs: 3, md: 4 },
						flexDirection: { xs: "column", md: "row" },
						gap: 2,
					}}
				>
					<Box>
						<Typography
							variant="h4"
							sx={{
								fontWeight: 700,
								fontSize: { xs: "1.75rem", md: "2.125rem" },
								mb: 0.5,
							}}
						>
							Despesas recentes
						</Typography>
						{hasData && !isLoading && (
							<Typography variant="body2" color="text.secondary">
								{data.length}{" "}
								{data.length === 1
									? "despesa encontrada"
									: "despesas encontradas"}
							</Typography>
						)}
					</Box>

					<Box
						display="flex"
						gap={{ xs: 1, sm: 2 }}
						flexWrap="wrap"
						sx={{ width: { xs: "100%", md: "auto" } }}
					>
						<Button
							variant="outlined"
							size="medium"
							sx={{
								textTransform: "none",
								fontWeight: 600,
								flex: { xs: 1, sm: "0 1 auto" },
								minWidth: { xs: "auto", sm: 120 },
							}}
							disabled={isLoading}
							onClick={downloadExpensesCsv}
						>
							Exportar
						</Button>
						<Button
							variant="outlined"
							size="medium"
							sx={{
								textTransform: "none",
								fontWeight: 600,
								flex: { xs: 1, sm: "0 1 auto" },
								minWidth: { xs: "auto", sm: 120 },
							}}
							disabled={isLoading}
						>
							Importar CSV
						</Button>
						<Button
							variant="contained"
							size="medium"
							sx={{
								textTransform: "none",
								fontWeight: 600,
								width: { xs: "100%", sm: "auto" },
								minWidth: { sm: 140 },
							}}
							disabled={isLoading}
							onClick={() => selectAction("create")}
						>
							Nova despesa
						</Button>
					</Box>
				</Box>

				{/* Loading State */}
				{isLoading && (
					<Stack spacing={2}>
						<ExpenseItemSkeleton />
						<ExpenseItemSkeleton />
						<ExpenseItemSkeleton />
					</Stack>
				)}

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
				{!isLoading && !isError && hasData && (
					<Stack spacing={2}>
						{data.map((expense: Expense) => (
							<ExpenseItem key={expense.id} expense={expense} />
						))}
					</Stack>
				)}
			</Container>
		</Box>
	);
}
