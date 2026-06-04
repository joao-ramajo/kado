import {
	Box,
	Card,
	CardContent,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { formatCurrency } from "../../../utils/formatCurrency";
import {
	DASHBOARD_SUMMARY_CARD_TONES,
	DASHBOARD_SUMMARY_CARDS,
	type SummaryCardDefinition,
} from "../constants/summaryCards";
import { useGetSummaryQuery } from "../hooks/useGetSummary";

export function FinancialSummary() {
	const { data, isPending, isError } = useGetSummaryQuery();

	useEffect(() => {
		if (isError) {
			toast.error("Erro ao buscar resumos.");
		}
	}, [isError]);

	const getCardValue = (card: SummaryCardDefinition) => {
		const value = data?.[card.valueKey];

		return typeof value === "number" ? value : 0;
	};

	const getCardTone = (card: SummaryCardDefinition, value: number) => {
		if (card.id === "expected_total" && value < 100) {
			return {
				color: "#ef4444",
				bgColor: "#fef2f2",
			};
		}

		if (card.id === "total_expense" && value >= 5_000_000) {
			return {
				color: "#ef4444",
				bgColor: "#fef2f2",
			};
		}

		return DASHBOARD_SUMMARY_CARD_TONES[card.tone];
	};

	return (
		<Box sx={{ mb: 4 }}>
			<Stack spacing={0.5} sx={{ mb: 2 }}>
				<Typography
					variant="h4"
					sx={{
						fontWeight: 700,
						fontSize: { xs: "1.75rem", md: "2.125rem" },
					}}
				>
					Resumo Financeiro
				</Typography>
				<Typography color="text.secondary">
					Visão consolidada com os principais indicadores do período.
				</Typography>
			</Stack>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						sm: "repeat(2, 1fr)",
						lg: "repeat(3, 1fr)",
					},
					gap: 2,
				}}
			>
				{DASHBOARD_SUMMARY_CARDS.map((card) => {
					const Icon = card.icon;
					const displayValue = getCardValue(card);
					const tone = getCardTone(card, displayValue);
					const isLoading = isPending;

					return (
						<Card
							key={card.id}
							elevation={0}
							sx={{
								border: "1px solid",
								borderColor: "divider",
								transition: "all 0.2s ease-in-out",
								"&:hover": {
									borderColor: tone.color,
									transform: "translateY(-2px)",
									boxShadow: `0 4px 12px ${tone.color}20`,
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
											bgcolor: tone.bgColor,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Icon
											sx={{
												fontSize: 20,
												color: tone.color,
											}}
										/>
									</Box>
								</Box>

								{isLoading ? (
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
											color: tone.color,
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
