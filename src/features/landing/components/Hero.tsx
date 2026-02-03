import { CheckCircle, TrendingUp } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Container,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
	const navigate = useNavigate();

	const benefits: { id: number; label: string }[] = [
		{
			id: 1,
			label: "Interface simples e intuitiva",
		},
		{
			id: 2,
			label: "Categorias personalizáveis",
		},
		{
			id: 3,
			label: "Relatórios automáticos",
		},
	];

	return (
		<Box
			component="section"
			sx={{
				py: { xs: 6, md: 12 },
				background: "linear-gradient(135deg, #F8FBFF 0%, #FFFFFF 100%)",
				position: "relative",
				overflow: "hidden",
				"&::before": {
					content: '""',
					position: "absolute",
					top: "-50%",
					right: "-10%",
					width: "600px",
					height: "600px",
					background:
						"radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, transparent 70%)",
					borderRadius: "50%",
					pointerEvents: "none",
				},
			}}
		>
			<Container maxWidth="lg">
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: { xs: 4, md: 8 },
						flexDirection: { xs: "column", md: "row" },
					}}
				>
					{/* Lado esquerdo - Conteúdo */}
					<Box sx={{ maxWidth: 560, flex: 1 }}>
						<Chip
							label="Beta 2026"
							size="small"
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
								fontSize: { xs: "2.5rem", md: "3.5rem" },
								fontWeight: 800,
								color: "#0066FF",
								lineHeight: 1.1,
								mb: 2,
								letterSpacing: "-0.02em",
							}}
						>
							Controle Financeiro
						</Typography>

						<Typography
							variant="h2"
							sx={{
								fontSize: { xs: "1.75rem", md: "2.25rem" },
								fontWeight: 300,
								color: "#1F2937",
								mb: 3,
								lineHeight: 1.3,
							}}
						>
							sem complicação
						</Typography>

						<Typography
							variant="body1"
							sx={{
								mb: 4,
								fontSize: "1.125rem",
								color: "#6B7280",
								lineHeight: 1.7,
								maxWidth: 480,
							}}
						>
							Kado é um gerenciador de contas que ajuda você a acompanhar
							pagamentos, recebimentos e controlar seu saldo de forma clara e
							eficiente.
						</Typography>

						{/* Lista de benefícios */}
						<Box
							sx={{ mb: 4, display: "flex", flexDirection: "column", gap: 1.5 }}
						>
							{benefits.map((benefit) => (
								<Box
									key={benefit.id}
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1.5,
										animation: `fadeInUp 0.6s ease-out ${benefit.id * 0.1}s both`,
										"@keyframes fadeInUp": {
											from: { opacity: 0, transform: "translateY(10px)" },
											to: { opacity: 1, transform: "translateY(0)" },
										},
									}}
								>
									<CheckCircle sx={{ color: "#00D4FF", fontSize: 20 }} />
									<Typography sx={{ color: "#4B5563", fontSize: "0.95rem" }}>
										{benefit.label}
									</Typography>
								</Box>
							))}
						</Box>

						<Box display="flex" gap={2} flexWrap="wrap">
							<Button
								variant="contained"
								size="large"
								onClick={() => navigate("/cadastre-se")}
								sx={{
									bgcolor: "#0066FF",
									px: 4,
									py: 1.5,
									fontSize: "1rem",
									fontWeight: 600,
									textTransform: "none",
									borderRadius: 2,
									boxShadow: "0 4px 14px rgba(0, 102, 255, 0.25)",
									"&:hover": {
										bgcolor: "#0052CC",
										boxShadow: "0 6px 20px rgba(0, 102, 255, 0.35)",
										transform: "translateY(-2px)",
									},
									transition: "all 0.3s ease",
								}}
							>
								Começar agora
							</Button>
							<Button
								variant="outlined"
								size="large"
								sx={{
									borderColor: "#0066FF",
									color: "#0066FF",
									px: 4,
									py: 1.5,
									fontSize: "1rem",
									fontWeight: 600,
									textTransform: "none",
									borderRadius: 2,
									borderWidth: 2,
									"&:hover": {
										borderWidth: 2,
										borderColor: "#0066FF",
										bgcolor: "#F8FBFF",
									},
								}}
								onClick={() => navigate("/recursos")}
							>
								Ver recursos
							</Button>
						</Box>
					</Box>

					{/* Lado direito - Card de demonstração */}
					<Box
						sx={{
							flex: 1,
							maxWidth: 420,
							width: "100%",
						}}
					>
						<Card
							elevation={0}
							sx={{
								border: "2px solid #E8F4FF",
								borderRadius: 3,
								overflow: "hidden",
								background: "#FFFFFF",
								position: "relative",
								transition: "all 0.4s ease",
								"&:hover": {
									transform: "translateY(-8px)",
									boxShadow: "0 20px 40px rgba(0, 102, 255, 0.12)",
								},
								"&::before": {
									content: '""',
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									height: "4px",
									background:
										"linear-gradient(90deg, #0066FF 0%, #00D4FF 100%)",
								},
							}}
						>
							<CardContent sx={{ p: 4 }}>
								<Box
									sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
								>
									<TrendingUp sx={{ color: "#0066FF", fontSize: 24 }} />
									<Typography
										variant="h6"
										sx={{
											fontWeight: 700,
											color: "#1F2937",
											fontSize: "1.125rem",
										}}
									>
										Resumo Financeiro
									</Typography>
								</Box>

								<Box sx={{ mb: 3 }}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											mb: 2,
											pb: 2,
											borderBottom: "1px solid #F3F4F6",
										}}
									>
										<Typography sx={{ color: "#6B7280", fontSize: "0.95rem" }}>
											Total recebido
										</Typography>
										<Typography
											sx={{
												color: "#10B981",
												fontWeight: 700,
												fontSize: "1rem",
											}}
										>
											R$ 12.450,00
										</Typography>
									</Box>

									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											pb: 2,
											borderBottom: "1px solid #F3F4F6",
										}}
									>
										<Typography sx={{ color: "#6B7280", fontSize: "0.95rem" }}>
											Total gasto
										</Typography>
										<Typography
											sx={{
												color: "#EF4444",
												fontWeight: 700,
												fontSize: "1rem",
											}}
										>
											R$ 8.320,00
										</Typography>
									</Box>
								</Box>

								<Box
									sx={{
										bgcolor: "#F8FBFF",
										borderRadius: 2,
										p: 2.5,
										border: "1px solid #E8F4FF",
									}}
								>
									<Typography
										sx={{
											color: "#6B7280",
											fontSize: "0.875rem",
											mb: 0.5,
											fontWeight: 500,
										}}
									>
										Saldo disponível
									</Typography>
									<Typography
										variant="h4"
										sx={{
											fontWeight: 800,
											color: "#0066FF",
											fontSize: "2rem",
											letterSpacing: "-0.02em",
										}}
									>
										R$ 4.130,00
									</Typography>
								</Box>

								<Box sx={{ mt: 3, pt: 3, borderTop: "1px solid #F3F4F6" }}>
									<Typography
										sx={{
											fontSize: "0.75rem",
											color: "#9CA3AF",
											textAlign: "center",
										}}
									>
										Atualizado em tempo real
									</Typography>
								</Box>
							</CardContent>
						</Card>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};
