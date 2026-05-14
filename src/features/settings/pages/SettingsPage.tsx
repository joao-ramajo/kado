import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Divider,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { PageTemplate } from "../../../components/PageTemplate";
import {
	DASHBOARD_SUMMARY_CARD_MAP,
	DASHBOARD_SUMMARY_CARD_OPTIONS,
	DEFAULT_DASHBOARD_SUMMARY_CARD_IDS,
	type SummaryCardId,
} from "../../dashboard/constants/summaryCards";
import {
	useDashboardSummaryCardsQuery,
	useUpdateDashboardSummaryCardsMutation,
} from "../../dashboard/hooks/useDashboardSummaryCards";
import { usePopupSettings } from "../hooks/usePopupSettings";

export function SettingsPage() {
	const { settings, setEnabled, setIntervalSeconds } = usePopupSettings();
	const { data: summaryCardPreferences } = useDashboardSummaryCardsQuery();
	const updateSummaryCardsMutation = useUpdateDashboardSummaryCardsMutation();
	const [cardIds, setCardIds] = useState<SummaryCardId[]>(
		DEFAULT_DASHBOARD_SUMMARY_CARD_IDS,
	);

	useEffect(() => {
		if (summaryCardPreferences?.card_ids?.length === 3) {
			setCardIds(summaryCardPreferences.card_ids);
		}
	}, [summaryCardPreferences?.card_ids]);

	const selectedCardDefinitions = useMemo(
		() => cardIds.map((cardId) => DASHBOARD_SUMMARY_CARD_MAP[cardId]),
		[cardIds],
	);

	const updateCardId = (index: number, value: SummaryCardId) => {
		setCardIds((previous) => {
			const next = [...previous] as SummaryCardId[];
			next[index] = value;
			return next;
		});
	};

	const optionsForIndex = (index: number) => {
		return DASHBOARD_SUMMARY_CARD_OPTIONS.filter(
			(option) => option.id === cardIds[index] || !cardIds.includes(option.id),
		);
	};

	const handleSaveCards = async () => {
		try {
			const response = await updateSummaryCardsMutation.mutateAsync({
				card_ids: cardIds,
			});

			setCardIds(response.card_ids);
			toast.success("Cards do dashboard salvos com sucesso.");
		} catch {
			toast.error("Não foi possível salvar os cards do dashboard.");
		}
	};

	return (
		<PageTemplate>
			<Stack spacing={4}>
				<Box>
					<Chip
						icon={<SettingsSuggestIcon />}
						label="Ajustes"
						sx={{
							mb: 2,
							bgcolor: "#EEF2FF",
							color: "#4338CA",
							fontWeight: 600,
						}}
					/>
					<Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
						Configurações de popups
					</Typography>
					<Typography color="text.secondary">
						Defina como os widgets de dica devem se comportar no seu ambiente.
					</Typography>
				</Box>

				<Card
					elevation={0}
					sx={{ border: "1px solid", borderColor: "divider" }}
				>
					<CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
						<Stack spacing={2.5}>
							<FormControlLabel
								control={
									<Switch
										checked={settings.enabled}
										onChange={(event) => setEnabled(event.target.checked)}
									/>
								}
								label="Receber popups de dicas"
							/>

							<TextField
								label="Intervalo para novo popup (segundos)"
								type="number"
								value={settings.intervalSeconds}
								onChange={(event) =>
									setIntervalSeconds(Number(event.target.value || 0))
								}
								inputProps={{ min: 5, max: 120, step: 1 }}
								helperText="Valor mínimo: 5 segundos. Valor máximo: 120 segundos."
								disabled={!settings.enabled}
							/>

							<Alert severity="info">
								Essas configurações são aplicadas automaticamente e salvas neste
								dispositivo.
							</Alert>
						</Stack>
					</CardContent>
				</Card>

				<Card
					elevation={0}
					sx={{ border: "1px solid", borderColor: "divider" }}
				>
					<CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
						<Stack spacing={2.5}>
							<Box>
								<Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
									Cards do dashboard
								</Typography>
								<Typography color="text.secondary">
									Escolha exatamente 3 indicadores para acompanhar na home.
								</Typography>
							</Box>

							<Divider />

							<Stack spacing={2}>
								{cardIds.map((cardId, index) => {
									const selected = DASHBOARD_SUMMARY_CARD_MAP[cardId];

									return (
										<FormControl fullWidth key={cardId}>
											<InputLabel id={`dashboard-card-${index}`}>
												Card {index + 1}
											</InputLabel>
											<Select
												labelId={`dashboard-card-${index}`}
												label={`Card ${index + 1}`}
												value={cardId}
												onChange={(event) =>
													updateCardId(
														index,
														event.target.value as SummaryCardId,
													)
												}
											>
												{optionsForIndex(index).map((option) => (
													<MenuItem key={option.id} value={option.id}>
														{option.label}
													</MenuItem>
												))}
											</Select>
											<Typography
												variant="body2"
												color="text.secondary"
												sx={{ mt: 0.75 }}
											>
												{selected.description}
											</Typography>
										</FormControl>
									);
								})}
							</Stack>

							<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
								{selectedCardDefinitions.map((card) => (
									<Chip key={card.id} label={card.label} variant="outlined" />
								))}
							</Stack>

							<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
								<Button
									variant="contained"
									onClick={handleSaveCards}
									disabled={
										updateSummaryCardsMutation.isPending ||
										cardIds.length !== 3 ||
										new Set(cardIds).size !== 3
									}
								>
									Salvar cards do dashboard
								</Button>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
								>
									O resumo é recalculado em tempo real sempre que a tela é
									aberta.
								</Typography>
							</Stack>

							<Alert severity="info">
								Se você não salvar uma seleção válida, o sistema usa os cards
								padrão.
							</Alert>
						</Stack>
					</CardContent>
				</Card>
			</Stack>
		</PageTemplate>
	);
}
