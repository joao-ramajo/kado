import CreditCardIcon from "@mui/icons-material/CreditCard";
import EditIcon from "@mui/icons-material/Edit";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	IconButton,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSourceModalContext } from "../context/SourceModalContextProvider";
import { getSourceDetailsQuery } from "../hooks/useGetSourceDetailsQuery";
import { useGetSourceQuery } from "../hooks/useGetSourceListQuery";
import { PayCreditCardStatementDialog } from "./PayCreditCardStatementDialog";

const formatMoney = (value: number) =>
	`R$ ${(value / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

const formatMonthReference = (value: string) =>
	new Date(value).toLocaleDateString("pt-BR", {
		month: "short",
		year: "numeric",
	});

export function CreditCardStatementsArea() {
	const {
		data: sourceDetailsData,
		isLoading,
		isError,
	} = getSourceDetailsQuery();
	const { data: sourceList = [] } = useGetSourceQuery();
	const { selectAction } = useSourceModalContext();
	const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

	useEffect(() => {
		if (isError) {
			toast.error("Erro ao buscar resumos das faturas.");
		}
	}, [isError]);

	const creditCardSources =
		sourceDetailsData?.filter((source) => source.type === "credit_card") ?? [];
	const selectedCard =
		creditCardSources.find((source) => source.id === selectedCardId) ?? null;

	if (isLoading) {
		return <Typography>Carregando resumos...</Typography>;
	}

	if (!creditCardSources.length) {
		return <Typography>Nenhuma fatura encontrada.</Typography>;
	}

	return (
		<>
			<Box sx={{ mb: 4 }}>
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
					<Box>
						<Typography variant="h5" sx={{ fontWeight: 600 }}>
							Resumos das Faturas
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Acompanhe os cartões de crédito e quite a fatura em aberto.
						</Typography>
					</Box>
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
					{creditCardSources.map((source) => (
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
										<CreditCardIcon
											sx={{
												color: source.color,
												fontSize: { xs: 18, sm: 20 },
											}}
										/>
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
											Fatura do cartão
										</Typography>
									</Box>
									<IconButton
										size="small"
										onClick={() => selectAction("edit", source)}
										sx={{ ml: "auto" }}
										aria-label={`Editar fonte ${source.name}`}
									>
										<EditIcon fontSize="small" />
									</IconButton>
								</Box>

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
											<Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>
												{formatMoney(source.current_statement.total_amount)}
											</Typography>
										</>
									) : (
										<Typography variant="body2" color="text.secondary">
											As próximas compras aparecerão aqui conforme o ciclo da
											fatura.
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
							</CardContent>
						</Card>
					))}
				</Box>
			</Box>

			<Box sx={{ mt: 4 }}>
				<Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
					Resumo dos cartões
				</Typography>
				<Card elevation={0} sx={{ border: 1, borderColor: "divider" }}>
					<CardContent sx={{ p: { xs: 2, sm: 3 } }}>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: 2,
							}}
						>
							<Box
								sx={{
									minWidth: { xs: "100%", sm: 220 },
									flex: "1 1 220px",
									p: 2,
									borderRadius: 2,
									bgcolor: "grey.50",
								}}
							>
								<Typography variant="body2" color="text.secondary">
									Cartões cadastrados
								</Typography>
								<Typography variant="h5" sx={{ fontWeight: 700 }}>
									{creditCardSources.length}
								</Typography>
							</Box>
							<Box
								sx={{
									minWidth: { xs: "100%", sm: 220 },
									flex: "1 1 220px",
									p: 2,
									borderRadius: 2,
									bgcolor: "grey.50",
								}}
							>
								<Typography variant="body2" color="text.secondary">
									Faturas em aberto
								</Typography>
								<Typography variant="h5" sx={{ fontWeight: 700 }}>
									{
										creditCardSources.filter(
											(source) => source.current_statement,
										).length
									}
								</Typography>
							</Box>
							<Box
								sx={{
									minWidth: { xs: "100%", sm: 220 },
									flex: "1 1 220px",
									p: 2,
									borderRadius: 2,
									bgcolor: "grey.50",
								}}
							>
								<Typography variant="body2" color="text.secondary">
									Saldo total disponível
								</Typography>
								<Typography variant="h5" sx={{ fontWeight: 700 }}>
									{formatMoney(
										creditCardSources.reduce(
											(total, source) => total + (source.available_limit ?? 0),
											0,
										),
									)}
								</Typography>
							</Box>
							<Box
								sx={{
									minWidth: { xs: "100%", sm: 220 },
									flex: "1 1 220px",
									p: 2,
									borderRadius: 2,
									bgcolor: "grey.50",
								}}
							>
								<Typography variant="body2" color="text.secondary">
									Total das faturas
								</Typography>
								<Typography variant="h5" sx={{ fontWeight: 700 }}>
									{formatMoney(
										creditCardSources.reduce(
											(total, source) =>
												total + (source.current_statement?.total_amount ?? 0),
											0,
										),
									)}
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</Card>
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
