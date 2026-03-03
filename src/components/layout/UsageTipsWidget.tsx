import { Close, LightbulbOutlined, TipsAndUpdates } from "@mui/icons-material";
import {
	Box,
	Fade,
	IconButton,
	Paper,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

const tips = [
	"Registre primeiro descrição e valor. Categoria e fonte podem ser ajustadas depois.",
	'Use o filtro de status para revisar tudo que está como "pendente".',
	"Se uma despesa foi paga, atualize a data de pagamento para manter o histórico fiel.",
	"Revise os lançamentos no fim do dia para evitar acúmulo de pendências.",
	"Padronize nomes de despesas para facilitar busca e análise no mês.",
];

const MIN_DELAY_MS = 5000;
const MAX_DELAY_MS = 12000;
const DISPLAY_DURATION_MS = 9000;

const getRandomDelay = () =>
	Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1)) + MIN_DELAY_MS;

export function UsageTipsWidget() {
	const isDesktop = useMediaQuery("(min-width:900px)");
	const [open, setOpen] = useState(false);
	const [tip, setTip] = useState(tips[0]);
	const showTimeoutRef = useRef<number | null>(null);
	const hideTimeoutRef = useRef<number | null>(null);

	useEffect(() => {
		if (!isDesktop) {
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
			}, getRandomDelay());
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
	}, [isDesktop, open]);

	if (!isDesktop) {
		return null;
	}

	return (
		<Fade in={open} timeout={300}>
			<Paper
				elevation={6}
				sx={{
					position: "fixed",
					right: 20,
					bottom: 20,
					width: 340,
					maxWidth: "calc(100vw - 40px)",
					borderRadius: 2.5,
					border: "1px solid #DCEBFF",
					bgcolor: "#FFFFFF",
					overflow: "hidden",
					zIndex: 1400,
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						bgcolor: "#F3F8FF",
						px: 1.5,
						py: 1,
						borderBottom: "1px solid #DCEBFF",
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
						<TipsAndUpdates sx={{ fontSize: 18, color: "#0066FF" }} />
						<Typography fontWeight={700} fontSize="0.9rem" color="#1F2937">
							Dica rápida
						</Typography>
					</Box>
					<IconButton
						size="small"
						onClick={() => setOpen(false)}
						aria-label="Fechar dica"
					>
						<Close fontSize="small" />
					</IconButton>
				</Box>

				<Box sx={{ p: 1.75, display: "flex", gap: 1.25 }}>
					<LightbulbOutlined sx={{ color: "#F59E0B", mt: 0.2 }} />
					<Typography
						sx={{ color: "#4B5563", lineHeight: 1.6, fontSize: "0.92rem" }}
					>
						{tip}
					</Typography>
				</Box>
			</Paper>
		</Fade>
	);
}
