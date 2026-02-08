import { InboxOutlined } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useDownloadExpensesCsv } from "../hooks/useDownloadExpensesCsv";
import { type Expense, useGetExpensesQuery } from "../hooks/useGetExpense";
import { ErrorState } from "./ErrorState";
import { ExpenseItem } from "./ExpenseItem";
import { ExpenseItemSkeleton } from "./ExpenseItemSkeleton";
import { RecentExpensesActions } from "./RecentExpensesActions";

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
	const { data, isLoading, isError, refetch } = useGetExpensesQuery();

	const hasData = !!data?.length;
	const total = data ? data.length : 0;

	return (
		<>
			<RecentExpensesActions
				hasData={hasData}
				isLoading={isLoading}
				total={total ?? 0}
				downloadExpensesCsv={useDownloadExpensesCsv}
			/>
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
