import type PaymentsIcon from "@mui/icons-material/Payments";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import type { GetSummaryResponse } from "../hooks/useGetSummary";

export type SummaryCardId =
	| "total_receive"
	| "total_expense"
	| "expected_total";

export type SummaryCardDefinition = {
	id: SummaryCardId;
	label: string;
	description: string;
	valueKey: keyof GetSummaryResponse;
	icon: typeof PaymentsIcon;
	tone: "blue" | "amber" | "emerald";
};

const toneStyles = {
	blue: { color: "#2563eb", bgColor: "#eff6ff" },
	amber: { color: "#d97706", bgColor: "#fffbeb" },
	emerald: { color: "#059669", bgColor: "#ecfdf5" },
	slate: { color: "#475569", bgColor: "#f8fafc" },
	violet: { color: "#7c3aed", bgColor: "#f5f3ff" },
	cyan: { color: "#0891b2", bgColor: "#ecfeff" },
} as const;

export const DASHBOARD_SUMMARY_CARDS: SummaryCardDefinition[] = [
	{
		id: "total_receive",
		label: "Total recebido",
		description: "Entradas pagas no caixa principal.",
		valueKey: "total_receive",
		icon: TrendingUpIcon,
		tone: "blue",
	},
	{
		id: "total_expense",
		label: "Total gasto",
		description: "Saídas pagas no caixa principal.",
		valueKey: "total_expense",
		icon: TrendingDownIcon,
		tone: "amber",
	},
	{
		id: "expected_total",
		label: "Saldo esperado",
		description: "Receitas e despesas pendentes no caixa.",
		valueKey: "expected_total",
		icon: SavingsIcon,
		tone: "emerald",
	},
];

export const DASHBOARD_SUMMARY_CARD_TONES = toneStyles;
