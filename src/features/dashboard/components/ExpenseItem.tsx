import {
	CalendarMonth,
	Category as CategoryIcon,
	CheckCircle,
	Schedule,
} from "@mui/icons-material";
import { alpha, Box, Chip, Paper, Typography, useTheme } from "@mui/material";
import { formatCurrency } from "../../../utils/formatCurrency";
import type { Expense } from "../hooks/useGetExpense";

type ExpenseItemProps = {
	expense: Expense;
	onClick?: () => void;
};

const statusConfig = {
	paid: {
		label: "Pago",
		color: "success" as const,
		bgColor: "#e8f5e9",
		textColor: "#2e7d32",
	},
	pending: {
		label: "Pendente",
		color: "warning" as const,
		bgColor: "#fff8e1",
		textColor: "#f57c00",
	},
	overdue: {
		label: "Atrasado",
		color: "error" as const,
		bgColor: "#ffebee",
		textColor: "#c62828",
	},
};

export function ExpenseItem({ expense, onClick }: ExpenseItemProps) {
	const theme = useTheme();
	const status = statusConfig[expense.status];
	const isIncome = expense.type === "income";

	// Formatar datas para melhor visualização
	const formatDate = (dateString: string | null) => {
		if (!dateString) return null;
		const date = new Date(dateString);
		return date.toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "short",
		});
	};

	return (
		<Paper
			elevation={0}
			sx={{
				p: { xs: 2, sm: 2.5 },
				border: "1px solid",
				borderColor: "divider",
				borderRadius: 2,
				transition: "all 0.2s ease-in-out",
				cursor: onClick ? "pointer" : "default",
				position: "relative",
				overflow: "hidden",
				"&:hover": onClick
					? {
							borderColor: isIncome ? "success.main" : "primary.main",
							boxShadow: `0 4px 12px ${alpha(
								isIncome
									? theme.palette.success.main
									: theme.palette.primary.main,
								0.15,
							)}`,
							transform: "translateY(-2px)",
						}
					: {},
				"&::before": {
					content: '""',
					position: "absolute",
					left: 0,
					top: 0,
					bottom: 0,
					width: 4,
					bgcolor: isIncome ? "success.main" : "primary.main",
					opacity: expense.status === "paid" ? 1 : 0.3,
				},
			}}
			onClick={onClick}
		>
			<Box
				display="flex"
				flexDirection={{ xs: "column", sm: "row" }}
				gap={{ xs: 2, sm: 3 }}
				alignItems={{ xs: "stretch", sm: "center" }}
			>
				{/* Seção Principal - Título e Categoria */}
				<Box flex={1} minWidth={0}>
					<Typography
						variant="subtitle1"
						fontWeight={600}
						sx={{
							mb: 0.5,
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							fontSize: { xs: "1rem", sm: "1.05rem" },
						}}
					>
						{expense.title}
					</Typography>
					<Box display="flex" alignItems="center" gap={0.5}>
						<CategoryIcon
							sx={{
								fontSize: 16,
								color: "text.secondary",
							}}
						/>
						<Typography
							variant="caption"
							color="text.secondary"
							sx={{
								fontSize: "0.85rem",
							}}
						>
							{expense.category ?? "Sem categoria"}
						</Typography>
					</Box>
				</Box>

				{/* Seção de Datas - Mobile: horizontal, Desktop: vertical */}
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "row", sm: "column" },
						gap: { xs: 2, sm: 0.5 },
						justifyContent: { xs: "space-between", sm: "flex-start" },
						minWidth: { sm: 140 },
					}}
				>
					{/* Data de Vencimento */}
					<Box display="flex" alignItems="center" gap={0.75}>
						<CalendarMonth
							sx={{
								fontSize: 16,
								color:
									expense.status === "overdue"
										? "error.main"
										: "text.secondary",
							}}
						/>
						<Box>
							<Typography
								variant="caption"
								sx={{
									display: "block",
									fontSize: "0.7rem",
									color: "text.secondary",
									lineHeight: 1.2,
								}}
							>
								Vencimento
							</Typography>
							<Typography
								variant="body2"
								sx={{
									fontSize: "0.85rem",
									fontWeight: 500,
									color:
										expense.status === "overdue"
											? "error.main"
											: "text.primary",
								}}
							>
								{formatDate(expense.due_date)}
							</Typography>
						</Box>
					</Box>

					{/* Data de Pagamento */}
					{expense.payment_date && (
						<Box display="flex" alignItems="center" gap={0.75}>
							<CheckCircle
								sx={{
									fontSize: 16,
									color: "success.main",
								}}
							/>
							<Box>
								<Typography
									variant="caption"
									sx={{
										display: "block",
										fontSize: "0.7rem",
										color: "text.secondary",
										lineHeight: 1.2,
									}}
								>
									Pago em
								</Typography>
								<Typography
									variant="body2"
									sx={{
										fontSize: "0.85rem",
										fontWeight: 500,
										color: "success.main",
									}}
								>
									{formatDate(expense.payment_date)}
								</Typography>
							</Box>
						</Box>
					)}

					{/* Indicador de pendente (sem data de pagamento) */}
					{!expense.payment_date && expense.status === "pending" && (
						<Box
							display="flex"
							alignItems="center"
							gap={0.75}
							sx={{ display: { xs: "none", sm: "flex" } }}
						>
							<Schedule
								sx={{
									fontSize: 16,
									color: "warning.main",
								}}
							/>
							<Typography
								variant="body2"
								sx={{
									fontSize: "0.85rem",
									color: "warning.main",
								}}
							>
								Aguardando
							</Typography>
						</Box>
					)}
				</Box>

				{/* Valor e Status */}
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "row", sm: "column" },
						alignItems: { xs: "center", sm: "flex-end" },
						justifyContent: { xs: "space-between", sm: "flex-start" },
						gap: 1.5,
						minWidth: { sm: 140 },
					}}
				>
					{/* Valor */}
					<Typography
						variant="h6"
						sx={{
							fontWeight: 700,
							fontSize: { xs: "1.15rem", sm: "1.25rem" },
							color: isIncome ? "success.main" : "text.primary",
							lineHeight: 1,
						}}
					>
						{isIncome ? "+" : "-"} {formatCurrency(expense.amount)}
					</Typography>

					{/* Chip de Status */}
					<Chip
						label={status.label}
						size="small"
						sx={{
							fontWeight: 600,
							fontSize: "0.75rem",
							height: 24,
							bgcolor: status.bgColor,
							color: status.textColor,
							border: "none",
							"& .MuiChip-label": {
								px: 1.5,
							},
						}}
					/>
				</Box>
			</Box>
		</Paper>
	);
}
