import { CheckCircle, Close, PlayArrow } from "@mui/icons-material";
import {
	Box,
	Card,
	CardContent,
	Chip,
	Dialog,
	DialogContent,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { PageTemplate } from "../../../components/PageTemplate";

type UsageBlock = {
	id: string;
	title: string;
	subtitle: string;
	steps: string[];
	imageAlt: string;
	imageUrl: string;
};

const usageBlocks: UsageBlock[] = [
	{
		id: "start",
		title: "Bloco 1: Começando em 5 minutos",
		subtitle: "Configure o básico para ter visão real do seu mês.",
		steps: [
			"Registre sua principal receita do mês.",
			"Adicione as despesas fixas (aluguel, internet, energia).",
			"Classifique os lançamentos com categorias.",
			"Revise o resumo para validar o saldo esperado.",
		],
		imageAlt: "Exemplo do dashboard inicial do Kado sem despesas registradas.",
		imageUrl: "/assets/images/dashboard-limpo.png",
	},
	{
		id: "daily",
		title: "Bloco 2: Rotina diária simples",
		subtitle: "Use o Kado em ciclos curtos para não acumular pendências.",
		steps: [
			"Abra o dashboard no início do dia e veja pendências.",
			"Lance despesas no momento em que acontecerem.",
			"Marque como paga assim que quitar.",
			"Use filtro por status para fechar o dia sem pendências esquecidas.",
		],
		imageAlt: "Exemplo de listagem de despesas com filtros",
		imageUrl: "/assets/images/dashboard-dados-iniciais.png",
	},
	{
		id: "monthly",
		title: "Bloco 3: Fechamento mensal",
		subtitle: "Feche o mês com histórico e backup organizados.",
		steps: [
			"Na aba de categorias, selecione o mês para analisar gastos.",
			"Clique em uma categoria para abrir os lançamentos detalhados.",
			"Revise fontes para ver saldo por contexto (principal, viagem etc.).",
			"Exporte backup em CSV/XLSX para histórico e segurança.",
		],
		imageAlt: "Exemplo de visão por categoria no mês",
		imageUrl: "/assets/images/visao-categoria.png",
	},
];

export function GuidePage() {
	const [selectedImage, setSelectedImage] = useState<{
		url: string;
		alt: string;
		title: string;
	} | null>(null);

	return (
		<PageTemplate>
			<Stack spacing={5}>
				<Box textAlign="center">
					<Chip
						label="Guia de uso"
						size="small"
						icon={<PlayArrow sx={{ fontSize: 16 }} />}
						sx={{
							mb: 2,
							bgcolor: "#E8F4FF",
							color: "#0066FF",
							fontWeight: 600,
							border: "1px solid #0066FF20",
						}}
					/>
					<Typography
						variant="h1"
						sx={{
							fontSize: { xs: "2rem", md: "2.75rem" },
							fontWeight: 800,
							color: "#1F2937",
							mb: 1.5,
							lineHeight: 1.15,
						}}
					>
						Guia rápido para usar o Kado
					</Typography>
					<Typography
						sx={{
							color: "#6B7280",
							fontSize: { xs: "0.98rem", md: "1.08rem" },
							maxWidth: 760,
							mx: "auto",
							lineHeight: 1.7,
						}}
					>
						Menos texto, mais prática: siga os blocos abaixo para aprender a
						registrar, revisar e fechar seu mês com clareza.
					</Typography>
				</Box>

				<Stack spacing={3}>
					{usageBlocks.map((block) => (
						<Card
							key={block.id}
							elevation={0}
							sx={{
								border: "2px solid #E8F4FF",
								borderRadius: 3,
								overflow: "hidden",
							}}
						>
							<CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
								<Box
									sx={{
										display: "grid",
										gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
										gap: { xs: 2.5, md: 3 },
										alignItems: "start",
									}}
								>
									<Box>
										<Typography
											variant="h5"
											sx={{ fontWeight: 800, color: "#1F2937", mb: 0.5 }}
										>
											{block.title}
										</Typography>
										<Typography
											sx={{ color: "#6B7280", mb: 2, lineHeight: 1.7 }}
										>
											{block.subtitle}
										</Typography>

										<Stack spacing={1.25}>
											{block.steps.map((step) => (
												<Box
													key={step}
													display="flex"
													alignItems="start"
													gap={1}
												>
													<CheckCircle
														sx={{
															fontSize: 19,
															color: "#059669",
															mt: 0.25,
															flexShrink: 0,
														}}
													/>
													<Typography
														sx={{ color: "#374151", lineHeight: 1.6 }}
													>
														{step}
													</Typography>
												</Box>
											))}
										</Stack>
									</Box>

									<Box>
										<Typography
											variant="caption"
											sx={{
												color: "#6B7280",
												fontWeight: 700,
												letterSpacing: "0.03em",
												mb: 1,
												display: "block",
											}}
										>
											EXEMPLO VISUAL
										</Typography>
										<Box
											component="img"
											src={block.imageUrl}
											alt={block.imageAlt}
											onClick={() =>
												setSelectedImage({
													url: block.imageUrl,
													alt: block.imageAlt,
													title: block.title,
												})
											}
											sx={{
												width: "100%",
												height: { xs: 180, md: 220 },
												objectFit: "cover",
												borderRadius: 2,
												border: "1px solid #DCEBFF",
												bgcolor: "#F8FBFF",
												cursor: "zoom-in",
											}}
										/>
										<Typography
											variant="caption"
											sx={{ color: "#9CA3AF", mt: 0.75, display: "block" }}
										>
											{ block.imageAlt }
										</Typography>
									</Box>
								</Box>
							</CardContent>
						</Card>
					))}
				</Stack>
			</Stack>

			<Dialog
				open={!!selectedImage}
				onClose={() => setSelectedImage(null)}
				fullWidth
				maxWidth="lg"
			>
				<DialogContent sx={{ p: { xs: 1.5, sm: 2 } }}>
					<Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
						<Typography sx={{ fontWeight: 700, color: "#1F2937" }}>
							{selectedImage?.title}
						</Typography>
						<IconButton
							size="small"
							onClick={() => setSelectedImage(null)}
							aria-label="Fechar imagem"
						>
							<Close />
						</IconButton>
					</Box>
					<Box
						component="img"
						src={selectedImage?.url}
						alt={selectedImage?.alt}
						sx={{
							width: "100%",
							height: "auto",
							maxHeight: "75vh",
							objectFit: "contain",
							borderRadius: 1.5,
							border: "1px solid #DCEBFF",
							bgcolor: "#F8FBFF",
						}}
					/>
				</DialogContent>
			</Dialog>
		</PageTemplate>
	);
}
