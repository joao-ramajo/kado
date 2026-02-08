import { Box, Button, Typography } from "@mui/material";
import { useExpenseModalContext } from "../context/ExpenseModalContextProvider";

type RecentExpensesActionsProps = {
	hasData: boolean;
	isLoading: boolean;
	total: number;
	downloadExpensesCsv: () => void;
};

export const RecentExpensesActions = ({
	hasData,
	isLoading,
	total,
	downloadExpensesCsv,
}: RecentExpensesActionsProps) => {
	const { selectAction } = useExpenseModalContext();
	return (
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
						{total}{" "}
						{total === 1 ? "despesa encontrada" : "despesas encontradas"}
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
					Exportar Backup
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
	);
};
