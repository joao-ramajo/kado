import {
	CheckCircle,
	Dashboard,
	EditNote,
	Lightbulb,
	NotificationsActive,
	PlayArrow,
	ReceiptLong,
	TipsAndUpdates,
	TrendingDown,
	TrendingUp,
	Tune,
} from "@mui/icons-material";
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Chip,
	Divider,
	Stack,
	Typography,
} from "@mui/material";
import { PageTemplate } from "../../../components/PageTemplate";

const quickStartSteps = [
	{
		title: "Registre despesas",
		description:
			"Almoço, mercado, transporte e contas. Quanto mais próximo do gasto, mais fiel fica seu histórico.",
		icon: <TrendingDown sx={{ color: "#DC2626" }} />,
	},
	{
		title: "Registre receitas",
		description:
			"Salário, freelas e vendas. Toda entrada registrada melhora sua visão real do mês.",
		icon: <TrendingUp sx={{ color: "#059669" }} />,
	},
	{
		title: "Acompanhe no dashboard",
		description:
			"Veja totais, saldo final e status das despesas para tomar decisões melhores.",
		icon: <Dashboard sx={{ color: "#0066FF" }} />,
	},
];

const weeklyRoutine = [
	"Manhã: registre entradas previstas no dia.",
	"Durante o dia: lance as despesas no momento em que acontecerem.",
	"Fim do dia: revise pendências e marque pagamentos concluídos.",
	"Fim do mês: compare gastos por categoria e ajuste prioridades.",
];

const usageTips = [
	{
		title: "Registre em menos de 30 segundos",
		description:
			"Preencha apenas descrição e valor primeiro. Categoria e fonte podem ser ajustadas depois sem perder agilidade.",
		icon: <ReceiptLong sx={{ color: "#0066FF" }} />,
	},
	{
		title: "Use filtros para fechar pendências",
		description:
			"Abra o filtro de status e revise despesas pendentes no fim do dia para manter o dashboard sempre confiável.",
		icon: <Tune sx={{ color: "#B45309" }} />,
	},
	{
		title: "Crie um ritual semanal",
		description:
			"Reserve 10 minutos por semana para revisar categorias com maior gasto e ajustar seus próximos lançamentos.",
		icon: <NotificationsActive sx={{ color: "#059669" }} />,
	},
];

export function GuidePage() {
	return (
		<PageTemplate>
			<Stack spacing={7}>
				<Box textAlign="center">
					<Chip
						label="Guia prático"
						size="small"
						icon={<PlayArrow sx={{ fontSize: 16 }} />}
						sx={{
							mb: 3,
							bgcolor: "#E8F4FF",
							color: "#0066FF",
							fontWeight: 600,
							border: "1px solid #0066FF20",
						}}
					/>
					<Typography
						variant="h1"
						sx={{
							fontSize: { xs: "2.25rem", md: "3.25rem" },
							fontWeight: 800,
							color: "#1F2937",
							mb: 2,
							lineHeight: 1.1,
						}}
					>
						Como usar o{" "}
						<Box component="span" sx={{ color: "#0066FF" }}>
							Kado
						</Box>{" "}
						no dia a dia
					</Typography>
					<Typography
						sx={{
							color: "#6B7280",
							fontSize: { xs: "1rem", md: "1.15rem" },
							maxWidth: 700,
							mx: "auto",
							lineHeight: 1.7,
						}}
					>
						Um fluxo simples para registrar movimentações, acompanhar resultados
						e manter clareza sobre seu dinheiro sem complexidade.
					</Typography>
				</Box>

				<Card
					elevation={0}
					sx={{
						border: "2px solid #E8F4FF",
						borderRadius: 3,
						bgcolor: "#FCFDFF",
					}}
				>
					<CardContent sx={{ p: { xs: 3, md: 5 } }}>
						<Stack spacing={2}>
							<Chip
								icon={<Lightbulb />}
								label="Por que usar?"
								sx={{
									width: "fit-content",
									bgcolor: "#FFF7E6",
									color: "#B45309",
									fontWeight: 600,
								}}
							/>
							<Typography
								variant="h5"
								fontWeight={700}
								sx={{ color: "#1F2937" }}
							>
								O problema que o Kado resolve
							</Typography>
							<Typography sx={{ color: "#6B7280", lineHeight: 1.8 }}>
								A maioria das pessoas não sabe exatamente para onde o dinheiro
								está indo. O Kado transforma gastos invisíveis em informação
								clara para apoiar decisões melhores todos os meses.
							</Typography>
						</Stack>
					</CardContent>
				</Card>

				<Box>
					<Typography
						variant="h4"
						sx={{ fontWeight: 800, color: "#1F2937", mb: 3, fontSize: "2rem" }}
					>
						Fluxo de uso recomendado
					</Typography>
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
							gap: 2.5,
						}}
					>
						{quickStartSteps.map((step) => (
							<Card
								key={step.title}
								elevation={0}
								sx={{
									border: "2px solid #E8F4FF",
									borderRadius: 2.5,
									transition: "all 0.2s ease",
									"&:hover": {
										borderColor: "#0066FF",
										transform: "translateY(-2px)",
									},
								}}
							>
								<CardContent sx={{ p: 3 }}>
									<Stack spacing={2}>
										<Avatar
											sx={{
												bgcolor: "#F3F8FF",
												color: "#0066FF",
												width: 42,
												height: 42,
											}}
										>
											{step.icon}
										</Avatar>
										<Typography fontWeight={700} sx={{ color: "#1F2937" }}>
											{step.title}
										</Typography>
										<Typography sx={{ color: "#6B7280", lineHeight: 1.7 }}>
											{step.description}
										</Typography>
									</Stack>
								</CardContent>
							</Card>
						))}
					</Box>
				</Box>

				<Card
					elevation={0}
					sx={{
						border: "2px solid #E8F4FF",
						borderRadius: 3,
						overflow: "hidden",
					}}
				>
					<CardContent sx={{ p: { xs: 3, md: 5 } }}>
						<Stack spacing={3}>
							<Box display="flex" alignItems="center" gap={1.5}>
								<TipsAndUpdates sx={{ color: "#0066FF" }} />
								<Typography
									variant="h5"
									fontWeight={700}
									sx={{ color: "#1F2937" }}
								>
									Rotina ideal de uso
								</Typography>
							</Box>
							<Stack spacing={1.5}>
								{weeklyRoutine.map((item) => (
									<Box key={item} display="flex" alignItems="center" gap={1.5}>
										<CheckCircle sx={{ color: "#059669", fontSize: 20 }} />
										<Typography sx={{ color: "#374151", lineHeight: 1.8 }}>
											{item}
										</Typography>
									</Box>
								))}
							</Stack>
						</Stack>
					</CardContent>
				</Card>

				<Box>
					<Typography
						variant="h5"
						sx={{ fontWeight: 800, color: "#1F2937", mb: 2.5 }}
					>
						Widgets de dicas rápidas
					</Typography>
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
							gap: 2,
						}}
					>
						{usageTips.map((tip) => (
							<Card
								key={tip.title}
								elevation={0}
								sx={{
									border: "1px solid #DCEBFF",
									borderRadius: 2.5,
									bgcolor: "#F8FBFF",
								}}
							>
								<CardContent sx={{ p: 2.75 }}>
									<Stack spacing={1.25}>
										<Box display="flex" alignItems="center" gap={1}>
											{tip.icon}
											<Typography fontWeight={700} sx={{ color: "#1F2937" }}>
												{tip.title}
											</Typography>
										</Box>
										<Typography sx={{ color: "#6B7280", lineHeight: 1.7 }}>
											{tip.description}
										</Typography>
									</Stack>
								</CardContent>
							</Card>
						))}
					</Box>
				</Box>

				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
						gap: 2.5,
					}}
				>
					<Card
						elevation={0}
						sx={{ border: "2px solid #E8F4FF", borderRadius: 3 }}
					>
						<CardContent sx={{ p: 3.5 }}>
							<Stack spacing={2}>
								<Box display="flex" alignItems="center" gap={1.5}>
									<EditNote sx={{ color: "#0066FF" }} />
									<Typography fontWeight={700} sx={{ color: "#1F2937" }}>
										Boas práticas
									</Typography>
								</Box>
								<Typography sx={{ color: "#6B7280", lineHeight: 1.8 }}>
									Registre no momento do gasto, mantenha categorias consistentes
									e revise pendências semanalmente. Esses hábitos aumentam a
									qualidade dos dados e a precisão da análise.
								</Typography>
							</Stack>
						</CardContent>
					</Card>

					<Card
						elevation={0}
						sx={{ border: "2px solid #E8F4FF", borderRadius: 3 }}
					>
						<CardContent sx={{ p: 3.5 }}>
							<Stack spacing={2}>
								<Typography fontWeight={700} sx={{ color: "#1F2937" }}>
									O que o Kado não é
								</Typography>
								<Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
									<Chip label="Não é contabilidade" />
									<Chip label="Não é app de investimentos" />
									<Chip label="Não é sistema fiscal" />
								</Stack>
								<Typography sx={{ color: "#6B7280", lineHeight: 1.8 }}>
									O Kado é um espelho simples e objetivo da sua vida financeira
									real.
								</Typography>
							</Stack>
						</CardContent>
					</Card>
				</Box>

				<Divider />

				<Card
					elevation={0}
					sx={{
						background: "linear-gradient(135deg, #0066FF 0%, #0052CC 100%)",
						borderRadius: 3,
						color: "#FFFFFF",
					}}
				>
					<CardContent sx={{ p: { xs: 3.5, md: 5 }, textAlign: "center" }}>
						<CheckCircle sx={{ color: "#BBF7D0", mb: 1 }} />
						<Typography sx={{ fontStyle: "italic", maxWidth: 620, mx: "auto" }}>
							"Você não precisa ganhar mais dinheiro. Precisa entender melhor o
							que já ganha."
						</Typography>
					</CardContent>
				</Card>
			</Stack>
		</PageTemplate>
	);
}
