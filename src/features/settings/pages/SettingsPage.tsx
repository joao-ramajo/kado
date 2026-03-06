import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import {
	Alert,
	Box,
	Card,
	CardContent,
	Chip,
	FormControlLabel,
	Stack,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { PageTemplate } from "../../../components/PageTemplate";
import { usePopupSettings } from "../hooks/usePopupSettings";

export function SettingsPage() {
	const { settings, setEnabled, setIntervalSeconds } = usePopupSettings();

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
			</Stack>
		</PageTemplate>
	);
}
