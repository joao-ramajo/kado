import {
	CheckCircle,
	Dashboard,
	Lightbulb,
	TrendingDown,
	TrendingUp,
} from "@mui/icons-material";
import {
	Box,
	Card,
	CardContent,
	Chip,
	Divider,
	Stack,
	Typography,
} from "@mui/material";
import { PageTemplate } from "../../../components/PageTemplate";

export function GuidePage() {
	return (
		<PageTemplate>
			<Stack spacing={6}>
				{/* HERO */}
				<Box textAlign="center">
					<Typography variant="h3" fontWeight={800}>
						Guia de Uso do Kado
					</Typography>
					<Typography color="text.secondary" mt={1} maxWidth={600} mx="auto">
						Aprenda como usar o Kado para organizar suas finanças e ter mais
						clareza sobre seu dinheiro.
					</Typography>
				</Box>

				{/* POR QUE */}
				<Card>
					<CardContent>
						<Stack spacing={2}>
							<Chip
								icon={<Lightbulb />}
								label="Por que usar?"
								color="primary"
							/>
							<Typography variant="h5" fontWeight={600}>
								O problema que o Kado resolve
							</Typography>
							<Typography color="text.secondary">
								A maioria das pessoas não sabe exatamente para onde o dinheiro
								está indo. O Kado existe para transformar gastos invisíveis em
								informação clara.
							</Typography>
						</Stack>
					</CardContent>
				</Card>

				{/* COMO USAR */}
				<Box>
					<Typography variant="h5" fontWeight={700} mb={3}>
						Como usar na prática
					</Typography>

					<Stack direction={{ xs: "column", md: "row" }} spacing={3}>
						<Card sx={{ flex: 1 }}>
							<CardContent>
								<Stack spacing={2}>
									<TrendingDown color="error" />
									<Typography fontWeight={600}>Registre despesas</Typography>
									<Typography color="text.secondary">
										Almoço, mercado, transporte, contas. Registre tudo no
										momento do gasto.
									</Typography>
								</Stack>
							</CardContent>
						</Card>

						<Card sx={{ flex: 1 }}>
							<CardContent>
								<Stack spacing={2}>
									<TrendingUp color="success" />
									<Typography fontWeight={600}>Registre receitas</Typography>
									<Typography color="text.secondary">
										Salário, freelas, vendas. Tudo que entra deve estar no
										sistema.
									</Typography>
								</Stack>
							</CardContent>
						</Card>

						<Card sx={{ flex: 1 }}>
							<CardContent>
								<Stack spacing={2}>
									<Dashboard color="primary" />
									<Typography fontWeight={600}>
										Acompanhe no dashboard
									</Typography>
									<Typography color="text.secondary">
										Veja totais, saldo final e tenha uma visão real da sua
										situação financeira.
									</Typography>
								</Stack>
							</CardContent>
						</Card>
					</Stack>
				</Box>

				{/* ROTINA */}
				<Card sx={{ bgcolor: "#F8FAFF" }}>
					<CardContent>
						<Stack spacing={3}>
							<Typography variant="h5" fontWeight={700}>
								Rotina ideal de uso
							</Typography>

							<Stack spacing={1}>
								<Typography>
									☀️ De manhã: registre seu salário como receita.
								</Typography>
								<Typography>
									🍔 Durante o dia: registre almoço e transporte.
								</Typography>
								<Typography>
									📊 No fim do mês: analise quanto gastou e quanto sobrou.
								</Typography>
							</Stack>
						</Stack>
					</CardContent>
				</Card>

				{/* O QUE NÃO É */}
				<Box>
					<Typography variant="h5" fontWeight={700} mb={2}>
						O que o Kado não é
					</Typography>

					<Stack direction="row" spacing={2} flexWrap="wrap">
						<Chip label="Não é contabilidade" />
						<Chip label="Não é app de investimentos" />
						<Chip label="Não é sistema fiscal" />
					</Stack>

					<Typography mt={2} color="text.secondary">
						O Kado é um espelho simples da sua vida financeira real.
					</Typography>
				</Box>

				<Divider />

				{/* FRASE FINAL */}
				<Box textAlign="center">
					<CheckCircle color="success" />
					<Typography
						fontStyle="italic"
						color="text.secondary"
						mt={1}
						maxWidth={500}
						mx="auto"
					>
						“Você não precisa ganhar mais dinheiro. Precisa entender melhor o
						que já ganha.”
					</Typography>
				</Box>
			</Stack>
		</PageTemplate>
	);
}
