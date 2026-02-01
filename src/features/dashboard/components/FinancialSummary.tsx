import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { formatCurrency } from "../../../utils/formatCurrency";
import { useGetSummaryQuery } from "../hooks/useGetSummary";

export function FinancialSummary() {
	const { data, isPending, isError } = useGetSummaryQuery();

	useEffect(() => {
		if (isError) {
			toast.error("Erro ao buscar resumos.");
		}
	}, [isError]);

	const cards = [
		{
			id: "receive",
			icon: TrendingUpIcon,
			label: "Total recebido",
			value: data?.total_receive,
			color: "#10b981",
			bgColor: "#ecfdf5",
		},
		{
			id: "expense",
			icon: TrendingDownIcon,
			label: "Total gasto",
			value: data?.total_expense,
			color: "#ef4444",
			bgColor: "#fef2f2",
		},
		{
			id: "balance",
			icon: AccountBalanceWalletIcon,
			label: "Saldo esperado",
			value: data?.expected_total,
			color: "#3b82f6",
			bgColor: "#eff6ff",
		},
	];

	return (
		<Box sx={{ mb: 4 }}>
			<Typography
				variant="h4"
				sx={{
					fontWeight: 700,
					fontSize: { xs: "1.75rem", md: "2.125rem" },
					mb: 0.5,
				}}
			>
				Resumo Financeiro
			</Typography>

			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					gap: 2,
				}}
			>
				{cards.map((card) => {
					const Icon = card.icon;
					const isPositive = card.id === "receive";
					const isNegative = card.id === "expense";
					const displayValue = card.value ?? 0;
					const isBalancePositive = card.id === "balance" && displayValue >= 0;
					const isBalanceNegative = card.id === "balance" && displayValue < 0;

					return (
						<Card
							key={card.id}
							elevation={0}
							sx={{
								flex: 1,
								minWidth: { xs: "100%", sm: 200 },
								border: "1px solid",
								borderColor: "divider",
								transition: "all 0.2s ease-in-out",
								"&:hover": {
									borderColor: card.color,
									transform: "translateY(-2px)",
									boxShadow: `0 4px 12px ${card.color}20`,
								},
							}}
						>
							<CardContent sx={{ p: 2.5 }}>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										mb: 1.5,
									}}
								>
									<Typography
										variant="body2"
										sx={{
											color: "text.secondary",
											fontWeight: 500,
											fontSize: "0.875rem",
										}}
									>
										{card.label}
									</Typography>
									<Box
										sx={{
											width: 36,
											height: 36,
											borderRadius: "8px",
											bgcolor: card.bgColor,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Icon
											sx={{
												fontSize: 20,
												color: card.color,
											}}
										/>
									</Box>
								</Box>

								{isPending ? (
									<Skeleton
										variant="text"
										width="80%"
										height={36}
										sx={{ borderRadius: 1 }}
									/>
								) : (
									<Typography
										variant="h5"
										sx={{
											fontWeight: 700,
											color:
												isPositive || isBalancePositive
													? "#10b981"
													: isNegative || isBalanceNegative
														? "#ef4444"
														: "text.primary",
											fontSize: { xs: "1.5rem", sm: "1.75rem" },
											letterSpacing: "-0.02em",
										}}
									>
										{formatCurrency(displayValue)}
									</Typography>
								)}
							</CardContent>
						</Card>
					);
				})}
			</Box>
		</Box>
	);
}
