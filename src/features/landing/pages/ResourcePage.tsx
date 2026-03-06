import { Box, Chip, Typography } from "@mui/material";
import { useState } from "react";

// ─── Ícones SVG inline (sem depender de pacotes extras) ────────────────────
const Icons = {
	receipt: (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title id="receipt-title">Recibo</title>
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
			<polyline points="14 2 14 8 20 8" />
			<line x1="16" y1="13" x2="8" y2="13" />
			<line x1="16" y1="17" x2="8" y2="17" />
			<polyline points="10 9 9 9 8 9" />
		</svg>
	),
	tag: (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title id="tag-title">Tag</title>
			<path d="M20.59 6.69a4.83 4.83 0 0 1 0 6.77l-6.77 6.76a5.53 5.53 0 0 1-7.8 0L3.51 18.05a5.53 5.53 0 0 1 0-7.8l6.77-6.76a4.83 4.83 0 0 1 6.77 0z" />
			<circle cx="11.88" cy="11.88" r="1.12" />
		</svg>
	),
	barChart: (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title id="barchart-title">Barra</title>
			<line x1="18" y1="20" x2="18" y2="10" />
			<line x1="12" y1="20" x2="12" y2="4" />
			<line x1="6" y1="20" x2="6" y2="14" />
		</svg>
	),
	download: (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title id="download-title">Download</title>
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="7 10 12 15 17 10" />
			<line x1="12" y1="15" x2="12" y2="3" />
		</svg>
	),
	upload: (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title id="upload-title">Upload</title>
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="17 8 12 3 7 8" />
			<line x1="12" y1="3" x2="12" y2="15" />
		</svg>
	),
	checkCircle: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title id="check-title">Check</title>
			<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
			<polyline points="22 4 12 14.01 9 11.01" />
		</svg>
	),
	circle: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title id="circle-title">Circulo</title>
			<circle cx="12" cy="12" r="10" />
		</svg>
	),
	chevronDown: (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title id="chevron-title">Chevron</title>
			<polyline points="6 9 12 15 18 9" />
		</svg>
	),
	plus: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
		>
			<title id="plus-title">Plus</title>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	),
	pencil: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title id="pencil-title">Pencil</title>
			<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
			<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
		</svg>
	),
	trash: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title id="trash-title">Trash</title>
			<polyline points="3 6 5 6 21 6" />
			<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
		</svg>
	),
	bolt: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title id="bolt-title">Bolt</title>
			<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
		</svg>
	),
	user: (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title id="user-title">user</title>
			<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="8" r="4" />
		</svg>
	),
};

// ─── Dados ──────────────────────────────────────────────────────────────────
type Step = { id: number; icon: React.ReactNode; text: string };
type Feature = {
	id: string;
	section: "account" | "transactions" | "organization" | "reports";
	icon: React.ReactNode;
	title: string;
	color: string;
	bgColor: string;
	summary: string;
	steps: Step[];
	tip?: string;
};

const featureSections = [
	{
		id: "account" as const,
		title: "Conta e acesso",
		description: "Login, isolamento de dados e início de uso",
	},
	{
		id: "transactions" as const,
		title: "Movimentações financeiras",
		description: "Como registrar, editar e pagar despesas/entradas",
	},
	{
		id: "organization" as const,
		title: "Organização e filtros",
		description: "Categorias, fontes e filtros para encontrar rápido",
	},
	{
		id: "reports" as const,
		title: "Relatórios e backup",
		description: "Importação/exportação para segurança e análise",
	},
];

const features: Feature[] = [
	{
		id: "conta",
		section: "account",
		icon: Icons.user,
		title: "Conta & Isolamento",
		color: "#6366f1",
		bgColor: "#eef2ff",
		summary:
			"Cada usuário possui sua própria base de dados financeira, totalmente separada e segura.",
		steps: [
			{ id: 1, icon: Icons.plus, text: "Crie sua conta com nome e senha" },
			{
				id: 2,
				icon: Icons.checkCircle,
				text: "Faça login — seus dados são 100% seus",
			},
			{
				id: 3,
				icon: Icons.checkCircle,
				text: "Nenhum outro usuário acessa suas informações",
			},
		],
		tip: "Você pode exportar seus dados a qualquer momento. Sem aprisionamento.",
	},
	{
		id: "despesas",
		section: "transactions",
		icon: Icons.receipt,
		title: "Criação de Despesas",
		color: "#3b82f6",
		bgColor: "#eff6ff",
		summary:
			"Registre qualquer movimentação financeira em segundos, com o mínimo de campos necessários.",
		steps: [
			{ id: 4, icon: Icons.plus, text: 'Clique "Nova despesa" no dashboard' },
			{
				id: 5,
				icon: Icons.checkCircle,
				text: "Preencha descrição e valor (obrigatórios)",
			},
			{
				id: 6,
				icon: Icons.checkCircle,
				text: "Selecione tipo: receita ou despesa",
			},
			{
				id: 7,
				icon: Icons.checkCircle,
				text: "Escolha status: pago ou pendente",
			},
			{
				id: 8,
				icon: Icons.checkCircle,
				text: "Adicione uma categoria (opcional)",
			},
		],
		tip: 'Exemplo: "Mercado" → R$ 120,00 → Despesa → Pago → Alimentação. Feito em 10 segundos.',
	},
	{
		id: "listagem",
		section: "transactions",
		icon: Icons.barChart,
		title: "Listagem & Visibilidade",
		color: "#8b5cf6",
		bgColor: "#f5f3ff",
		summary:
			"Veja todas as suas despesas em uma lista limpa, com feedback visual por status e tipo.",
		steps: [
			{
				id: 9,
				icon: Icons.checkCircle,
				text: "Todas as despesas listadas em uma tela",
			},
			{
				id: 10,
				icon: Icons.checkCircle,
				text: "Cores diferenciam pago, pendente e atrasado",
			},
			{
				id: 11,
				icon: Icons.checkCircle,
				text: "Valores formatados automaticamente",
			},
			{
				id: 12,
				icon: Icons.checkCircle,
				text: "Categorias visíveis para cada item",
			},
		],
	},
	{
		id: "editar",
		section: "transactions",
		icon: Icons.pencil,
		title: "Edição & Ação Rápida",
		color: "#f59e0b",
		bgColor: "#fffbeb",
		summary:
			"Edite qualquer despesa ou marque como paga diretamente na lista, sem passos extras.",
		steps: [
			{
				id: 13,
				icon: Icons.pencil,
				text: "Clique no ícone de edição na despesa",
			},
			{
				id: 14,
				icon: Icons.checkCircle,
				text: "Altere qualquer campo no modal",
			},
			{
				id: 15,
				icon: Icons.bolt,
				text: 'Ou use "Marcar como paga" — ação direta, sem abrir modal',
			},
		],
		tip: 'A ação rápida "Marcar como paga" foi feita pra ser exatamente assim: um clique.',
	},
	{
		id: "categorias",
		section: "organization",
		icon: Icons.tag,
		title: "Categorias",
		color: "#10b981",
		bgColor: "#ecfdf5",
		summary:
			"Organize suas despesas em categorias personalizadas que você mesmo cria.",
		steps: [
			{ id: 16, icon: Icons.plus, text: "Crie categorias com nome e cor" },
			{
				id: 17,
				icon: Icons.checkCircle,
				text: "Associe despesas a categorias ao criar ou editar",
			},
			{
				id: 18,
				icon: Icons.checkCircle,
				text: "Agrupe visualmente no dashboard",
			},
			{
				id: 24,
				icon: Icons.checkCircle,
				text: "Abra os registros da categoria em modal com um clique",
			},
			{
				id: 25,
				icon: Icons.checkCircle,
				text: "Filtre por mês para ver apenas o período desejado",
			},
		],
		tip: "Categorias são opcionais. Se você não quer usar, não precisa. O Kado não força nada.",
	},
	{
		id: "fontes",
		section: "organization",
		icon: Icons.user,
		title: "Fontes de dinheiro",
		color: "#14b8a6",
		bgColor: "#f0fdfa",
		summary:
			"Separe seu dinheiro por fontes (carteira principal, viagem, reserva) para ter contexto real.",
		steps: [
			{ id: 26, icon: Icons.plus, text: "Crie fontes com nome e cor" },
			{
				id: 27,
				icon: Icons.checkCircle,
				text: "Associe entradas e despesas a cada fonte",
			},
			{
				id: 28,
				icon: Icons.checkCircle,
				text: "Acompanhe saldo por fonte no painel dedicado",
			},
		],
	},
	{
		id: "resumo",
		section: "reports",
		icon: Icons.barChart,
		title: "Resumo Financeiro",
		color: "#ef4444",
		bgColor: "#fef2f2",
		summary:
			"Um olhar rápido sobre a sua situação financeira — sem gráficos complexos, só o que importa.",
		steps: [
			{ id: 19, icon: Icons.checkCircle, text: "Total de receitas do período" },
			{ id: 20, icon: Icons.checkCircle, text: "Total de despesas do período" },
			{
				id: 21,
				icon: Icons.checkCircle,
				text: "Saldo calculado automaticamente",
			},
			{ id: 22, icon: Icons.checkCircle, text: "Visão de pendentes vs pagas" },
		],
		tip: "O resumo atualiza em tempo real conforme você registra ou marca despesas.",
	},
	{
		id: "exportar",
		section: "reports",
		icon: Icons.download,
		title: "Exportação CSV e XLSX",
		color: "#64748b",
		bgColor: "#f1f5f9",
		summary:
			"Baixe todos os seus dados em CSV ou XLSX para backup, auditoria pessoal e análises externas.",
		steps: [
			{
				id: 29,
				icon: Icons.checkCircle,
				text: 'Clique "Exportar Backup" para CSV completo',
			},
			{
				id: 30,
				icon: Icons.checkCircle,
				text: 'Clique "Exportar Excel" para planilha XLSX formatada',
			},
			{
				id: 31,
				icon: Icons.download,
				text: "Baixe e abra no Excel, Google Sheets ou ferramenta de BI",
			},
		],
	},
	{
		id: "importar",
		section: "reports",
		icon: Icons.upload,
		title: "Importação de backup (CSV)",
		color: "#0ea5e9",
		bgColor: "#e0f2fe",
		summary:
			"Restaure ou traga dados de planilhas CSV para dentro do Kado de forma rápida.",
		steps: [
			{
				id: 32,
				icon: Icons.plus,
				text: 'Clique em "Importar Backup" na listagem de despesas',
			},
			{
				id: 33,
				icon: Icons.checkCircle,
				text: "Selecione um arquivo CSV no formato esperado",
			},
			{
				id: 34,
				icon: Icons.bolt,
				text: "O sistema importa e atualiza a listagem automaticamente",
			},
		],
		tip: "Importação ideal para migração, recuperação de backup ou início rápido.",
	},
];

// ─── Fluxos ─────────────────────────────────────────────────────────────────
type Flow = {
	title: string;
	tag: string;
	tagColor: string;
	whenToUse: string;
	expectedResult: string;
	steps: string[];
};

const flows: Flow[] = [
	{
		title: "Primeira semana no Kado",
		tag: "Onboarding",
		tagColor: "#3b82f6",
		whenToUse:
			"Para quem acabou de criar conta e quer começar com o básico certo.",
		expectedResult:
			"Você termina a semana com seu fluxo de caixa inicial organizado e visível.",
		steps: [
			"Crie sua conta e entre no dashboard",
			"Cadastre sua principal receita do mês (salário/freela)",
			"Registre as despesas fixas (aluguel, internet, energia)",
			"Adicione 3 a 5 despesas variáveis recorrentes",
			"Use o resumo para validar saldo esperado do mês",
		],
	},
	{
		title: "Rotina mensal de contas",
		tag: "Mensal",
		tagColor: "#10b981",
		whenToUse:
			"Para manter disciplina mensal e acompanhar o que já foi pago x pendente.",
		expectedResult:
			"Você reduz esquecimentos e tem clareza de quanto ainda falta pagar.",
		steps: [
			"No início do mês, lance as contas previstas como pendentes",
			"Durante o mês, marque como pagas conforme quitar cada uma",
			"Revise semanalmente a aba de despesas com filtro de status",
			"No fechamento, exporte CSV/XLSX para histórico e backup",
		],
	},
	{
		title: "Acompanhamento por categoria",
		tag: "Análise",
		tagColor: "#8b5cf6",
		whenToUse:
			"Para entender para onde o dinheiro está indo e corrigir excessos.",
		expectedResult:
			"Você identifica categorias críticas e toma decisões mais rápidas no mês.",
		steps: [
			"Classifique as despesas nas categorias corretas",
			"Na aba de categorias, filtre o mês desejado",
			"Clique em uma categoria para abrir os lançamentos detalhados",
			"Revise as maiores despesas e ajuste prioridades do próximo mês",
		],
	},
	{
		title: "Controle por fontes de dinheiro",
		tag: "Multi-conta",
		tagColor: "#0ea5e9",
		whenToUse:
			"Para separar orçamento pessoal, reserva, viagem ou projetos específicos.",
		expectedResult:
			"Você passa a enxergar saldos e movimentações por contexto, sem mistura.",
		steps: [
			"Crie fontes diferentes (ex: principal, viagem, emergência)",
			"Associe cada lançamento à fonte correta ao criar/editar",
			"Revise a aba de fontes para conferir saldo de cada contexto",
			"Use isso para decidir de onde pagar novas despesas",
		],
	},
	{
		title: "Backup e restauração de dados",
		tag: "Segurança",
		tagColor: "#f59e0b",
		whenToUse:
			"Para preservar histórico e migrar dados entre ambientes sem perder controle.",
		expectedResult:
			"Seus dados ficam portáveis e você evita retrabalho em caso de troca/perda.",
		steps: [
			"Exporte backup CSV no fechamento do mês",
			"Guarde em nuvem ou pasta de segurança",
			"Quando necessário, use Importar Backup (CSV)",
			"Valide resumo e categorias após importação",
		],
	},
];

// ─── Componentes ────────────────────────────────────────────────────────────
function FeatureCard({
	feature,
	expanded,
	onToggle,
}: {
	feature: Feature;
	expanded: boolean;
	onToggle: () => void;
}) {
	return (
		<Box
			sx={{
				border: "1px solid",
				borderColor: expanded ? feature.color : "divider",
				borderRadius: 3,
				overflow: "hidden",
				transition: "border-color 0.25s ease",
				"&:hover": { borderColor: feature.color },
			}}
		>
			{/* Header clicável */}
			<Box
				onClick={onToggle}
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 2,
					p: { xs: 2, sm: 2.5 },
					cursor: "pointer",
					userSelect: "none",
					background: expanded
						? `linear-gradient(90deg, ${feature.bgColor}, transparent)`
						: "transparent",
					transition: "background 0.25s ease",
				}}
			>
				{/* Ícone */}
				<Box
					sx={{
						width: 44,
						height: 44,
						borderRadius: 2.5,
						bgcolor: feature.bgColor,
						color: feature.color,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexShrink: 0,
					}}
				>
					{feature.icon}
				</Box>

				{/* Texto */}
				<Box sx={{ flex: 1, minWidth: 0 }}>
					<Typography
						variant="subtitle1"
						sx={{ fontWeight: 700, fontSize: "1rem", color: "text.primary" }}
					>
						{feature.title}
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "text.secondary", fontSize: "0.82rem", mt: 0.25 }}
					>
						{feature.summary}
					</Typography>
				</Box>

				{/* Chevron */}
				<Box
					sx={{
						color: feature.color,
						display: "flex",
						alignItems: "center",
						flexShrink: 0,
						transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
						transition: "transform 0.25s ease",
					}}
				>
					{Icons.chevronDown}
				</Box>
			</Box>

			{/* Body expandível */}
			{expanded && (
				<Box
					sx={{
						px: { xs: 2, sm: 2.5 },
						pb: 2.5,
						pt: 0.5,
						borderTop: "1px solid",
						borderColor: "divider",
					}}
				>
					{/* Steps */}
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 1.25,
							mt: 1.5,
						}}
					>
						{feature.steps.map((step) => (
							<Box
								key={step.id}
								sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}
							>
								<Box sx={{ color: feature.color, flexShrink: 0, mt: 0.15 }}>
									{step.icon}
								</Box>
								<Typography
									variant="body2"
									sx={{ color: "text.secondary", lineHeight: 1.5 }}
								>
									{step.text}
								</Typography>
							</Box>
						))}
					</Box>

					{/* Tip */}
					{feature.tip && (
						<Box
							sx={{
								mt: 2,
								p: 1.75,
								borderRadius: 2,
								bgcolor: feature.bgColor,
								border: "1px solid",
								borderColor: `${feature.color}40`,
							}}
						>
							<Typography
								variant="caption"
								sx={{
									color: feature.color,
									fontWeight: 600,
									display: "block",
									mb: 0.25,
								}}
							>
								💡 Dica
							</Typography>
							<Typography
								variant="body2"
								sx={{ color: "text.secondary", fontSize: "0.82rem" }}
							>
								{feature.tip}
							</Typography>
						</Box>
					)}
				</Box>
			)}
		</Box>
	);
}

function FlowCard({ flow, index }: { flow: Flow; index: number }) {
	return (
		<Box
			sx={{
				border: "1px solid divider",
				borderRadius: 3,
				p: { xs: 2, sm: 2.5 },
				position: "relative",
				bgcolor: "background.paper",
			}}
		>
			{/* Número grande no fundo */}
			<Typography
				sx={{
					position: "absolute",
					top: -4,
					right: 12,
					fontSize: "4.5rem",
					fontWeight: 800,
					color: "text.disabled",
					opacity: 0.18,
					lineHeight: 1,
					userSelect: "none",
					fontFamily: "'Georgia', serif",
				}}
			>
				{index + 1}
			</Typography>

			{/* Tag */}
			<Chip
				label={flow.tag}
				size="small"
				sx={{
					bgcolor: `${flow.tagColor}18`,
					color: flow.tagColor,
					fontWeight: 600,
					fontSize: "0.72rem",
					height: 22,
					mb: 1,
				}}
			/>

			{/* Título */}
			<Typography
				variant="subtitle1"
				sx={{ fontWeight: 700, mb: 1.5, color: "text.primary" }}
			>
				{flow.title}
			</Typography>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
					gap: 1.25,
					mb: 2,
				}}
			>
				<Box
					sx={{
						borderRadius: 2,
						bgcolor: "action.hover",
						p: 1.25,
					}}
				>
					<Typography
						variant="caption"
						sx={{ fontWeight: 700, color: "text.primary", display: "block" }}
					>
						Quando usar
					</Typography>
					<Typography variant="body2" sx={{ color: "text.secondary", mt: 0.3 }}>
						{flow.whenToUse}
					</Typography>
				</Box>
				<Box
					sx={{
						borderRadius: 2,
						bgcolor: "action.hover",
						p: 1.25,
					}}
				>
					<Typography
						variant="caption"
						sx={{ fontWeight: 700, color: "text.primary", display: "block" }}
					>
						Resultado esperado
					</Typography>
					<Typography variant="body2" sx={{ color: "text.secondary", mt: 0.3 }}>
						{flow.expectedResult}
					</Typography>
				</Box>
			</Box>

			{/* Steps com linha conectora */}
			<Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
				{flow.steps.map((step, i) => (
					<Box key={step} sx={{ display: "flex", gap: 1.5 }}>
						{/* Linha vertical + círculo */}
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								flexShrink: 0,
							}}
						>
							<Box
								sx={{
									width: 22,
									height: 22,
									borderRadius: "50%",
									bgcolor: flow.tagColor,
									color: "white",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "0.7rem",
									fontWeight: 700,
									flexShrink: 0,
								}}
							>
								{i + 1}
							</Box>
							{i < flow.steps.length - 1 && (
								<Box
									sx={{
										width: 2,
										flex: 1,
										minHeight: 20,
										bgcolor: `${flow.tagColor}30`,
									}}
								/>
							)}
						</Box>

						{/* Texto do step */}
						<Typography
							variant="body2"
							sx={{
								color: "text.secondary",
								pt: 0.15,
								pb: i < flow.steps.length - 1 ? 1.75 : 0,
								lineHeight: 1.5,
							}}
						>
							{step}
						</Typography>
					</Box>
				))}
			</Box>
		</Box>
	);
}

// ─── Page ───────────────────────────────────────────────────────────────────
export function ResourcesPage() {
	const [expandedId, setExpandedId] = useState<string | null>("despesas");
	const [activeSection, setActiveSection] = useState<"features" | "flows">(
		"features",
	);
	const groupedFeatures = featureSections.map((section) => ({
		...section,
		items: features.filter((feature) => feature.section === section.id),
	}));

	return (
		<Box
			sx={{
				minHeight: "100vh",
				bgcolor: "background.default",
			}}
		>
			{/* ── Hero ── */}
			<Box
				sx={{
					position: "relative",
					overflow: "hidden",
					bgcolor: "primary.main",
					color: "white",
					px: { xs: 2, sm: 4 },
					pt: { xs: 5, sm: 7 },
					pb: { xs: 5, sm: 6 },
					textAlign: "center",
				}}
			>
				{/* Círculos decorativos */}
				<Box
					sx={{
						position: "absolute",
						top: -60,
						left: -60,
						width: 200,
						height: 200,
						borderRadius: "50%",
						bgcolor: "rgba(255,255,255,0.06)",
						pointerEvents: "none",
					}}
				/>
				<Box
					sx={{
						position: "absolute",
						bottom: -40,
						right: -40,
						width: 160,
						height: 160,
						borderRadius: "50%",
						bgcolor: "rgba(255,255,255,0.05)",
						pointerEvents: "none",
					}}
				/>
				<Box
					sx={{
						position: "absolute",
						top: "40%",
						right: "15%",
						width: 80,
						height: 80,
						borderRadius: "50%",
						bgcolor: "rgba(255,255,255,0.04)",
						pointerEvents: "none",
					}}
				/>

				<Typography
					variant="h3"
					sx={{
						fontWeight: 800,
						fontSize: { xs: "1.75rem", sm: "2.25rem" },
						position: "relative",
						zIndex: 1,
						mb: 1,
					}}
				>
					Recursos do Kado
				</Typography>
				<Typography
					variant="body1"
					sx={{
						opacity: 0.85,
						maxWidth: 520,
						mx: "auto",
						fontSize: { xs: "0.9rem", sm: "1rem" },
						lineHeight: 1.6,
						position: "relative",
						zIndex: 1,
					}}
				>
					Tudo que você precisa para registrar, organizar e acompanhar suas
					finanças — sem complexidade desnecessária.
				</Typography>
			</Box>

			{/* ── Tabs: Funcionalidades / Fluxos ── */}
			<Box
				sx={{
					position: "sticky",
					top: 0,
					zIndex: 10,
					bgcolor: "background.paper",
					borderBottom: "1px solid",
					borderColor: "divider",
					px: { xs: 2, sm: 4 },
				}}
			>
				<Box
					sx={{
						maxWidth: 680,
						mx: "auto",
						display: "flex",
						gap: 1,
						py: 1.25,
					}}
				>
					{(["features", "flows"] as const).map((section) => (
						<Box
							key={section}
							onClick={() => setActiveSection(section)}
							sx={{
								flex: 1,
								textAlign: "center",
								py: 1,
								borderRadius: 2,
								cursor: "pointer",
								bgcolor:
									activeSection === section ? "primary.main" : "transparent",
								color: activeSection === section ? "white" : "text.secondary",
								fontWeight: 600,
								fontSize: "0.875rem",
								transition: "all 0.2s ease",
								userSelect: "none",
								"&:hover": {
									bgcolor:
										activeSection === section ? "primary.main" : "action.hover",
								},
							}}
						>
							{section === "features" ? "Funcionalidades" : "Fluxos de uso"}
						</Box>
					))}
				</Box>
			</Box>

			{/* ── Conteúdo ── */}
			<Box
				sx={{
					maxWidth: 680,
					mx: "auto",
					px: { xs: 2, sm: 4 },
					py: { xs: 3, sm: 4 },
				}}
			>
				{/* Funcionalidades */}
				{activeSection === "features" && (
					<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
						{groupedFeatures.map((section) => (
							<Box key={section.id}>
								<Box sx={{ mb: 1.25 }}>
									<Typography
										variant="subtitle1"
										sx={{ fontWeight: 700, color: "text.primary" }}
									>
										{section.title}
									</Typography>
									<Typography
										variant="body2"
										sx={{ color: "text.secondary", fontSize: "0.82rem" }}
									>
										{section.description}
									</Typography>
								</Box>
								<Box
									sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
								>
									{section.items.map((feature) => (
										<FeatureCard
											key={feature.id}
											feature={feature}
											expanded={expandedId === feature.id}
											onToggle={() =>
												setExpandedId(
													expandedId === feature.id ? null : feature.id,
												)
											}
										/>
									))}
								</Box>
							</Box>
						))}
					</Box>
				)}

				{/* Fluxos */}
				{activeSection === "flows" && (
					<Box>
						<Typography
							variant="body2"
							sx={{ color: "text.secondary", mb: 2.5, textAlign: "center" }}
						>
							Exemplos reais de como pessoas usam o Kado no dia a dia
						</Typography>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 2,
							}}
						>
							{flows.map((flow, i) => (
								<FlowCard key={flow.title} flow={flow} index={i} />
							))}
						</Box>
					</Box>
				)}
			</Box>

			{/* ── Footer note ── */}
			<Box
				sx={{
					maxWidth: 680,
					mx: "auto",
					px: { xs: 2, sm: 4 },
					pb: { xs: 4, sm: 6 },
				}}
			>
				<Box
					sx={{
						borderRadius: 3,
						border: "1px dashed",
						borderColor: "divider",
						p: { xs: 2, sm: 2.5 },
						textAlign: "center",
					}}
				>
					<Typography
						variant="body2"
						sx={{
							color: "text.secondary",
							fontSize: "0.82rem",
							lineHeight: 1.6,
						}}
					>
						O Kado é um{" "}
						<strong>caderno digital de finanças pessoais bem feito</strong> —
						não um sistema contábil, nem um planner avançado. Só o essencial,
						sem fricção.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
