// SourcesArea.tsx

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddIcon from "@mui/icons-material/Add";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Typography,
} from "@mui/material";
import { useSourceModalContext } from "../context/SourceModalContextProvider";
import { getSourceDetailsQuery } from "../hooks/useGetSourceDetailsQuery";

const formatMoney = (v: number) =>
	`R$ ${(v / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

export function SourcesArea() {
	const { data: sourceDetailsData, isLoading } = getSourceDetailsQuery();

	const { selectAction } = useSourceModalContext();

	if (isLoading) {
		return <Typography>Carregando fontes...</Typography>;
	}

	if (!sourceDetailsData?.length) {
		return <Typography>Nenhuma fonte encontrada.</Typography>;
	}

	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					justifyContent: "space-between",
					alignItems: { xs: "stretch", sm: "center" },
					gap: 2,
					mb: 3,
				}}
			>
				<Typography variant="h5" sx={{ fontWeight: 600 }}>
					Gerenciar Fontes
				</Typography>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					sx={{
						textTransform: "none",
						borderRadius: 2,
						px: 3,
						width: { xs: "100%", sm: "auto" },
					}}
					onClick={() => selectAction("create")}
				>
					Nova fonte
				</Button>
			</Box>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						md: "repeat(2, 1fr)",
					},
					gap: 2,
				}}
			>
				{sourceDetailsData.map((source) => (
					<Card
						key={source.id}
						elevation={0}
						sx={{
							border: 1,
							borderColor: "divider",
							transition: "all 0.2s",
							cursor: "pointer",
							"&:hover": {
								borderColor: source.color,
								boxShadow: `0 4px 12px ${source.color}20`,
							},
							"&:active": {
								transform: { xs: "scale(0.98)", sm: "none" },
							},
						}}
					>
						<CardContent sx={{ p: { xs: 2, sm: 3 } }}>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 2,
									mb: 2,
								}}
							>
								<Box
									sx={{
										width: { xs: 36, sm: 40 },
										height: { xs: 36, sm: 40 },
										borderRadius: 2,
										bgcolor: `${source.color}15`,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										flexShrink: 0,
									}}
								>
									<AccountBalanceWalletIcon
										sx={{ color: source.color, fontSize: { xs: 18, sm: 20 } }}
									/>
								</Box>
								<Typography
									variant="h6"
									sx={{
										fontWeight: 600,
										fontSize: { xs: "1rem", sm: "1.25rem" },
									}}
								>
									{source.name}
								</Typography>
							</Box>

							<Box
								sx={{
									display: "grid",
									gridTemplateColumns: { xs: "auto 1fr", sm: "1fr 1fr" },
									gap: { xs: 1, sm: 1 },
									rowGap: { xs: 0.5, sm: 1 },
								}}
							>
								<Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
									Recebido:
								</Typography>
								<Typography
									sx={{
										fontWeight: 500,
										fontSize: { xs: "0.875rem", sm: "1rem" },
										textAlign: { xs: "right", sm: "left" },
									}}
								>
									{formatMoney(source.total_income)}
								</Typography>

								<Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
									Gasto:
								</Typography>
								<Typography
									sx={{
										fontWeight: 500,
										fontSize: { xs: "0.875rem", sm: "1rem" },
										textAlign: { xs: "right", sm: "left" },
									}}
								>
									{formatMoney(source.total_expense)}
								</Typography>

								<Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
									Saldo:
								</Typography>
								<Typography
									sx={{
										fontWeight: 600,
										color: source.balance >= 0 ? "success.main" : "error.main",
										fontSize: { xs: "0.875rem", sm: "1rem" },
										textAlign: { xs: "right", sm: "left" },
									}}
								>
									{formatMoney(source.balance)}
								</Typography>
							</Box>

							<Chip
								label={`${source.expenses_count} registros`}
								size="small"
								sx={{
									mt: 2,
									bgcolor: `${source.color}15`,
									color: source.color,
									fontWeight: 500,
									fontSize: { xs: "0.7rem", sm: "0.75rem" },
									height: { xs: 22, sm: 24 },
								}}
							/>
						</CardContent>
					</Card>
				))}
			</Box>
		</Box>
	);
}
