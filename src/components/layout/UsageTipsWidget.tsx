import { Close, LightbulbOutlined, TipsAndUpdates } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Chip,
	Fade,
	IconButton,
	Paper,
	Snackbar,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import { usePopupSettings } from "../../features/settings/hooks/usePopupSettings";

const tips = [
	"Registre primeiro descrição e valor. Categoria e fonte podem ser ajustadas depois.",
	'Use o filtro de status para revisar tudo que está como "pendente".',
	"Se uma despesa foi paga, atualize a data de pagamento para manter o histórico fiel.",
	"Revise os lançamentos no fim do dia para evitar acúmulo de pendências.",
	"Padronize nomes de despesas para facilitar busca e análise no mês.",
];

const DISPLAY_DURATION_MS = 9000;
const SETTINGS_NOTICE_STORAGE_KEY = "KADO_POPUP_SETTINGS_NOTICE_SHOWN";

export function UsageTipsWidget() {
	const isDesktop = useMediaQuery("(min-width:900px)");
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	const { settings } = usePopupSettings();
	const [open, setOpen] = useState(false);
	const [tip, setTip] = useState(tips[0]);
	const [settingsNoticeOpen, setSettingsNoticeOpen] = useState(false);
	const showTimeoutRef = useRef<number | null>(null);
	const hideTimeoutRef = useRef<number | null>(null);
	const settingsNoticeRef = useRef<number | null>(null);

	useEffect(() => {
		if (!isDesktop || !isAuthenticated || !settings.enabled) {
			setOpen(false);
			if (showTimeoutRef.current) window.clearTimeout(showTimeoutRef.current);
			if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
			return;
		}

		const scheduleNextShow = () => {
			showTimeoutRef.current = window.setTimeout(() => {
				setTip((previousTip) => {
					const availableTips = tips.filter((item) => item !== previousTip);
					const randomIndex = Math.floor(Math.random() * availableTips.length);
					return availableTips[randomIndex] ?? tips[0];
				});
				setOpen(true);
			}, settings.intervalSeconds * 1000);
		};

		if (!open) {
			scheduleNextShow();
		}

		if (open) {
			hideTimeoutRef.current = window.setTimeout(() => {
				setOpen(false);
			}, DISPLAY_DURATION_MS);
		}

		return () => {
			if (showTimeoutRef.current) window.clearTimeout(showTimeoutRef.current);
			if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
		};
	}, [
		isDesktop,
		isAuthenticated,
		settings.enabled,
		settings.intervalSeconds,
		open,
	]);

	useEffect(() => {
		if (!isDesktop || !isAuthenticated || !settings.enabled) return;

		const alreadyShown = sessionStorage.getItem(SETTINGS_NOTICE_STORAGE_KEY);
		if (alreadyShown) return;

		settingsNoticeRef.current = window.setTimeout(() => {
			setSettingsNoticeOpen(true);
			sessionStorage.setItem(SETTINGS_NOTICE_STORAGE_KEY, "true");
		}, 1800);

		return () => {
			if (settingsNoticeRef.current) {
				window.clearTimeout(settingsNoticeRef.current);
			}
		};
	}, [isDesktop, isAuthenticated, settings.enabled]);

	if (!isDesktop || !isAuthenticated || !settings.enabled) {
		return null;
	}

	return (
		<>
			<Fade in={open} timeout={300}>
				<Paper
					elevation={6}
					sx={{
						position: "fixed",
						right: 24,
						bottom: 24,
						width: 360,
						maxWidth: "calc(100vw - 48px)",
						borderRadius: 3,
						border: "1px solid #DBEAFE",
						bgcolor: "#FFFFFF",
						overflow: "hidden",
						zIndex: 1400,
						boxShadow:
							"0 18px 40px rgba(2, 6, 23, 0.15), 0 6px 14px rgba(59, 130, 246, 0.16)",
					}}
				>
					<Box
						sx={{
							position: "relative",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							background:
								"linear-gradient(135deg, #EEF2FF 0%, #EFF6FF 48%, #ECFEFF 100%)",
							px: 1.75,
							py: 1.25,
							borderBottom: "1px solid #DBEAFE",
						}}
					>
						<Box
							sx={{
								position: "absolute",
								right: -22,
								top: -20,
								width: 88,
								height: 88,
								borderRadius: "50%",
								bgcolor: "rgba(59,130,246,0.12)",
								pointerEvents: "none",
							}}
						/>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Avatar
								sx={{
									width: 32,
									height: 32,
									bgcolor: "#DBEAFE",
									color: "#2563EB",
								}}
							>
								<TipsAndUpdates sx={{ fontSize: 18 }} />
							</Avatar>
							<Box>
								<Typography fontWeight={800} fontSize="0.93rem" color="#1F2937">
									Dica do momento
								</Typography>
								<Chip
									label="Produtividade"
									size="small"
									sx={{
										height: 20,
										mt: 0.3,
										bgcolor: "#E0E7FF",
										color: "#4338CA",
										fontWeight: 600,
										fontSize: "0.7rem",
									}}
								/>
							</Box>
						</Box>
						<IconButton
							size="small"
							onClick={() => setOpen(false)}
							aria-label="Fechar dica"
							sx={{
								bgcolor: "rgba(255,255,255,0.8)",
								backdropFilter: "blur(4px)",
								"&:hover": {
									bgcolor: "rgba(255,255,255,1)",
								},
							}}
						>
							<Close fontSize="small" />
						</IconButton>
					</Box>

					<Box sx={{ px: 2, py: 1.75, display: "flex", gap: 1.25 }}>
						<LightbulbOutlined sx={{ color: "#F59E0B", mt: 0.25 }} />
						<Typography
							sx={{
								color: "#334155",
								lineHeight: 1.62,
								fontSize: "0.93rem",
								fontWeight: 500,
							}}
						>
							{tip}
						</Typography>
					</Box>
					<Box
						sx={{
							height: 4,
							background:
								"linear-gradient(90deg, #2563EB 0%, #06B6D4 55%, #22C55E 100%)",
						}}
					/>
				</Paper>
			</Fade>

			<Snackbar
				open={settingsNoticeOpen}
				onClose={() => setSettingsNoticeOpen(false)}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				message="Você pode ajustar popups em Ajustes."
				action={
					<Button
						size="small"
						color="inherit"
						onClick={() => {
							setSettingsNoticeOpen(false);
							navigate("/ajustes");
						}}
					>
						Ajustar
					</Button>
				}
			/>
		</>
	);
}
