import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import SavingsIcon from "@mui/icons-material/Savings";
import TodayIcon from "@mui/icons-material/Today";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import type { GetSummaryResponse } from "../hooks/useGetSummary";

export type SummaryCardId =
	| "total_receive"
	| "total_expense"
	| "expected_total"
	| "final_balance"
	| "total_receive_30_days"
	| "total_expense_30_days"
	| "current_balance"
	| "expected_expenses"
	| "total_expense_pending"
	| "credit_card_open_total"
	| "credit_card_limit_used"
	| "spent_today"
	| "spent_month";

export type SummaryCardDefinition = {
	id: SummaryCardId;
	label: string;
	description: string;
	valueKey: keyof GetSummaryResponse;
	icon: typeof CalendarMonthIcon;
	tone: "blue" | "amber" | "emerald" | "slate" | "violet" | "cyan";
};

const toneStyles = {
	blue: { color: "#2563eb", bgColor: "#eff6ff" },
	amber: { color: "#d97706", bgColor: "#fffbeb" },
	emerald: { color: "#059669", bgColor: "#ecfdf5" },
	slate: { color: "#475569", bgColor: "#f8fafc" },
	violet: { color: "#7c3aed", bgColor: "#f5f3ff" },
	cyan: { color: "#0891b2", bgColor: "#ecfeff" },
} as const;

export const DASHBOARD_SUMMARY_CARD_OPTIONS: SummaryCardDefinition[] = [
	{
		id: "total_receive_30_days",
		label: "Total recebido nos últimos 30 dias",
		description: "Entradas pagas no período recente.",
		valueKey: "total_receive_30_days",
		icon: PaymentsIcon,
		tone: "blue",
	},
	{
		id: "total_expense_30_days",
		label: "Total gasto nos últimos 30 dias",
		description: "Saídas pagas no período recente.",
		valueKey: "total_expense_30_days",
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
	{
		id: "final_balance",
		label: "Saldo final",
		description: "Alias visual do saldo esperado.",
		valueKey: "final_balance",
		icon: SavingsIcon,
		tone: "emerald",
	},
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
		id: "current_balance",
		label: "Saldo atual",
		description: "Entradas menos saídas já pagas.",
		valueKey: "current_balance",
		icon: SavingsIcon,
		tone: "emerald",
	},
	{
		id: "expected_expenses",
		label: "Gastos esperados",
		description: "Saídas pagas somadas às pendentes.",
		valueKey: "expected_expenses",
		icon: CalendarMonthIcon,
		tone: "slate",
	},
	{
		id: "total_expense_pending",
		label: "Pendente a pagar",
		description: "Despesas ainda não quitadas.",
		valueKey: "total_expense_pending",
		icon: TodayIcon,
		tone: "slate",
	},
	{
		id: "credit_card_open_total",
		label: "Cartão aberto",
		description: "Total em faturas ainda não pagas.",
		valueKey: "credit_card_open_total",
		icon: CreditCardIcon,
		tone: "cyan",
	},
	{
		id: "credit_card_limit_used",
		label: "Limite usado no cartão",
		description: "Compras no cartão ainda não pagas.",
		valueKey: "credit_card_limit_used",
		icon: CreditCardIcon,
		tone: "violet",
	},
	{
		id: "spent_today",
		label: "Gasto no dia",
		description: "Despesas pagas no dia atual.",
		valueKey: "spent_today",
		icon: TodayIcon,
		tone: "amber",
	},
	{
		id: "spent_month",
		label: "Gasto no mês",
		description: "Despesas pagas no mês atual.",
		valueKey: "spent_month",
		icon: CalendarMonthIcon,
		tone: "amber",
	},
];

export const DEFAULT_DASHBOARD_SUMMARY_CARD_IDS: SummaryCardId[] = [
	"total_receive_30_days",
	"total_expense_30_days",
	"expected_total",
];

export const DASHBOARD_SUMMARY_CARD_MAP = Object.fromEntries(
	DASHBOARD_SUMMARY_CARD_OPTIONS.map((card) => [card.id, card]),
) as Record<SummaryCardId, SummaryCardDefinition>;

export const DASHBOARD_SUMMARY_CARD_TONES = toneStyles;
