import { Close } from "@mui/icons-material";
import {
	Box,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import type { Category } from "../hooks/useGetCategoryListQuery";
import { type Expense, useGetExpensesQuery } from "../hooks/useGetExpense";
import { ErrorState } from "./ErrorState";
import { ExpenseItem } from "./ExpenseItem";
import { ExpenseItemSkeleton } from "./ExpenseItemSkeleton";

type CategoryExpensesModalProps = {
	open: boolean;
	onClose: () => void;
	category: Category | null;
	month?: number;
};

const MONTHS = [
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro",
];

export function CategoryExpensesModal({
	open,
	onClose,
	category,
	month,
}: CategoryExpensesModalProps) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const {
		data: expenses,
		isLoading,
		isError,
		refetch,
	} = useGetExpensesQuery("all", undefined, category?.id, month);

	if (!category) return null;

	const monthLabel = month ? MONTHS[month - 1] : "Todos os meses";

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			fullScreen={isMobile}
			maxWidth="md"
			PaperProps={{
				sx: {
					height: { xs: "100dvh", sm: "min(86vh, 760px)" },
					m: { xs: 0, sm: 2 },
					borderRadius: { xs: 0, sm: 2 },
				},
			}}
		>
			<DialogTitle
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-start",
					gap: 1,
					pb: 1.5,
				}}
			>
				<Box sx={{ minWidth: 0 }}>
					<Typography variant="h6" sx={{ fontWeight: 700 }}>
						Despesas e Entradas
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ wordBreak: "break-word" }}
					>
						{category.name} • {monthLabel}
					</Typography>
				</Box>
				<IconButton onClick={onClose} size="small" sx={{ mt: -0.5, mr: -0.5 }}>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent
				dividers
				sx={{
					px: { xs: 1.5, sm: 3 },
					py: { xs: 1.5, sm: 2 },
					overflowY: "auto",
				}}
			>
				{isLoading && (
					<Stack spacing={2}>
						<ExpenseItemSkeleton />
						<ExpenseItemSkeleton />
					</Stack>
				)}

				{isError && !isLoading && <ErrorState onRetry={refetch} />}

				{!isLoading && !isError && (!expenses || expenses.length === 0) && (
					<Typography variant="body2" color="text.secondary">
						Nenhum registro encontrado para os filtros selecionados.
					</Typography>
				)}

				{!isLoading && !isError && expenses && expenses.length > 0 && (
					<Stack spacing={2}>
						{expenses.map((expense: Expense) => (
							<ExpenseItem key={expense.id} expense={expense} />
						))}
					</Stack>
				)}
			</DialogContent>
		</Dialog>
	);
}
