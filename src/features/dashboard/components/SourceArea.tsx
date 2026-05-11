// SourcesArea.tsx

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddIcon from "@mui/icons-material/Add";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useSourceModalContext } from "../context/SourceModalContextProvider";
import { getSourceDetailsQuery } from "../hooks/useGetSourceDetailsQuery";
import { useGetSourceQuery } from "../hooks/useGetSourceListQuery";
import { PayCreditCardStatementDialog } from "./PayCreditCardStatementDialog";

const formatMoney = (v: number) =>
	`R$ ${(v / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

const formatMonthReference = (value: string) =>
	new Date(value).toLocaleDateString("pt-BR", {
		month: "short",
		year: "numeric",
	});

export function SourcesArea() {
	const { data: sourceDetailsData, isLoading } = getSourceDetailsQuery();
	const { data: sourceList = [] } = useGetSourceQuery();
	const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

	const { selectAction } = useSourceModalContext();
	const selectedCard =
		sourceDetailsData?.find((source) => source.id === selectedCardId) ?? null;

	if (isLoading) {
		return <Typography>Carregando fontes...</Typography>;
	}

	if (!sourceDetailsData?.length) {
		return <Typography>Nenhuma fonte encontrada.</Typography>;
	}

	return (
		<>
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
										{source.type === "credit_card" ? (
											<CreditCardIcon
												sx={{
													color: source.color,
													fontSize: { xs: 18, sm: 20 },
												}}
											/>
										) : (
											<AccountBalanceWalletIcon
												sx={{
													color: source.color,
													fontSize: { xs: 18, sm: 20 },
												}}
											/>
										)}
									</Box>
									<Box sx={{ minWidth: 0 }}>
										<Typography
											variant="h6"
											sx={{
												fontWeight: 600,
												fontSize: { xs: "1rem", sm: "1.25rem" },
											}}
										>
											{source.name}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{source.type === "credit_card"
												? "Cartão de crédito"
												: source.is_default
													? "Fonte principal"
													: "Fonte de caixa"}
										</Typography>
									</Box>
								</Box>

								{source.type === "credit_card" ? (
									<>
										<Box
											sx={{
												display: "grid",
												gridTemplateColumns: { xs: "auto 1fr", sm: "1fr 1fr" },
												gap: 1,
											}}
										>
											<Typography>Limite:</Typography>
											<Typography
												fontWeight={500}
												textAlign={{ xs: "right", sm: "left" }}
											>
												{formatMoney(source.credit_limit ?? 0)}
											</Typography>
											<Typography>Usado:</Typography>
											<Typography
												fontWeight={500}
												textAlign={{ xs: "right", sm: "left" }}
											>
												{formatMoney(source.used_limit ?? 0)}
											</Typography>
											<Typography>Disponível:</Typography>
											<Typography
												fontWeight={600}
												color={
													(source.available_limit ?? 0) >= 0
														? "success.main"
														: "error.main"
												}
												textAlign={{ xs: "right", sm: "left" }}
											>
												{formatMoney(source.available_limit ?? 0)}
											</Typography>
										</Box>

										<Box
											sx={{
												mt: 2,
												p: 2,
												borderRadius: 2,
												bgcolor: "grey.50",
												border: "1px solid",
												borderColor: "divider",
											}}
										>
											<Typography fontWeight={600} sx={{ mb: 0.5 }}>
												{source.current_statement
													? `Fatura ${formatMonthReference(source.current_statement.reference_month)}`
													: "Sem fatura em aberto"}
											</Typography>
											{source.current_statement ? (
												<>
													<Typography variant="body2" color="text.secondary">
														Fecha em{" "}
														{new Date(
															source.current_statement.closing_at,
														).toLocaleDateString("pt-BR")}{" "}
														• vence em{" "}
														{new Date(
															source.current_statement.due_at,
														).toLocaleDateString("pt-BR")}
													</Typography>
													<Typography
														variant="h6"
														fontWeight={700}
														sx={{ mt: 1 }}
													>
														{formatMoney(source.current_statement.total_amount)}
													</Typography>
												</>
											) : (
												<Typography variant="body2" color="text.secondary">
													As próximas compras aparecerão aqui conforme o ciclo
													da fatura.
												</Typography>
											)}
										</Box>

										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
												gap: 2,
												mt: 2,
											}}
										>
											<Chip
												label={`${source.expenses_count} parcelas registradas`}
												size="small"
												sx={{
													bgcolor: `${source.color}15`,
													color: source.color,
													fontWeight: 500,
												}}
											/>
											<Button
												variant="contained"
												size="small"
												onClick={() => setSelectedCardId(source.id)}
												disabled={
													!source.current_statement ||
													source.current_statement.total_amount <= 0
												}
											>
												Pagar fatura
											</Button>
										</Box>
									</>
								) : (
									<>
										<Box
											sx={{
												display: "grid",
												gridTemplateColumns: { xs: "auto 1fr", sm: "1fr 1fr" },
												gap: { xs: 1, sm: 1 },
												rowGap: { xs: 0.5, sm: 1 },
											}}
										>
											<Typography
												sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
											>
												Recebido:
											</Typography>
											<Typography
												sx={{
													fontWeight: 500,
													fontSize: { xs: "0.875rem", sm: "1rem" },
													textAlign: { xs: "right", sm: "left" },
												}}
											>
												{formatMoney(source.total_income ?? 0)}
											</Typography>

											<Typography
												sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
											>
												Gasto:
											</Typography>
											<Typography
												sx={{
													fontWeight: 500,
													fontSize: { xs: "0.875rem", sm: "1rem" },
													textAlign: { xs: "right", sm: "left" },
												}}
											>
												{formatMoney(source.total_expense ?? 0)}
											</Typography>

											<Typography
												sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
											>
												Saldo:
											</Typography>
											<Typography
												sx={{
													fontWeight: 600,
													color:
														(source.balance ?? 0) >= 0
															? "success.main"
															: "error.main",
													fontSize: { xs: "0.875rem", sm: "1rem" },
													textAlign: { xs: "right", sm: "left" },
												}}
											>
												{formatMoney(source.balance ?? 0)}
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
									</>
								)}
							</CardContent>
						</Card>
					))}
				</Box>
			</Box>

			<PayCreditCardStatementDialog
				open={selectedCard !== null}
				onClose={() => setSelectedCardId(null)}
				cardName={selectedCard?.name ?? ""}
				statement={selectedCard?.current_statement ?? null}
				sources={sourceList}
			/>
		</>
	);
}
