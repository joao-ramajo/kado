import {
	CheckCircle,
	Email,
	Home,
	Language,
	NavigateNext,
	Print,
	Warning,
} from "@mui/icons-material";
import {
	Alert,
	Box,
	Breadcrumbs,
	Button,
	Container,
	Divider,
	Link,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const TermsPage = () => {
	const navigate = useNavigate();
	const currentDate = new Date().toLocaleDateString("pt-BR");

	const sections = [
		{ id: "coleta-dados", title: "Coleta e Uso de Dados", number: "01" },
		{
			id: "responsabilidade",
			title: "Responsabilidade do Usuário",
			number: "02",
		},
		{ id: "privacidade", title: "Privacidade e LGPD", number: "03" },
		{ id: "alteracoes", title: "Alterações nos Termos", number: "04" },
		{
			id: "dados-financeiros",
			title: "Uso dos Dados Financeiros",
			number: "05",
		},
		{ id: "seguranca", title: "Segurança e Armazenamento", number: "06" },
		{ id: "limitacao", title: "Limitação de Responsabilidade", number: "07" },
		{ id: "propriedade", title: "Propriedade Intelectual", number: "08" },
		{ id: "cancelamento", title: "Cancelamento de Conta", number: "09" },
		{ id: "contato", title: "Contato", number: "10" },
	];

	return (
		<Box sx={{ bgcolor: "#F8FBFF", minHeight: "100vh", py: { xs: 4, md: 8 } }}>
			<Container maxWidth="lg">
				{/* Breadcrumb */}
				<Breadcrumbs
					separator={<NavigateNext fontSize="small" />}
					sx={{ mb: 4 }}
				>
					<Link
						underline="hover"
						sx={{
							display: "flex",
							alignItems: "center",
							color: "#6B7280",
							"&:hover": { color: "#0066FF" },
						}}
						href="/inicio"
					>
						<Home sx={{ mr: 0.5, fontSize: 18 }} />
						Início
					</Link>
					<Typography sx={{ color: "#0066FF", fontWeight: 600 }}>
						Termos e Condições
					</Typography>
				</Breadcrumbs>

				{/* Header */}
				<Box sx={{ mb: 6 }}>
					<Typography
						variant="h1"
						sx={{
							fontSize: { xs: "2.5rem", md: "3.5rem" },
							fontWeight: 800,
							color: "#1F2937",
							mb: 2,
							lineHeight: 1.1,
						}}
					>
						Termos e{" "}
						<Box component="span" sx={{ color: "#0066FF" }}>
							Condições
						</Box>
					</Typography>

					<Box
						sx={{
							borderLeft: "4px solid #0066FF",
							bgcolor: "#FFFFFF",
							p: 3,
							borderRadius: 2,
							border: "1px solid #E8F4FF",
							borderLeftWidth: "4px",
						}}
					>
						<Typography sx={{ color: "#1F2937", mb: 1, fontWeight: 600 }}>
							<Box component="span" sx={{ color: "#0066FF" }}>
								Última atualização:
							</Box>{" "}
							{currentDate}
						</Typography>
						<Typography sx={{ color: "#6B7280", lineHeight: 1.7 }}>
							Ao usar o <strong style={{ color: "#0066FF" }}>Kado</strong>, você
							concorda com os seguintes termos e condições. Leia atentamente
							para entender seus direitos e responsabilidades.
						</Typography>
					</Box>
				</Box>

				{/* Índice Rápido */}
				<Box
					sx={{
						bgcolor: "#E8F4FF",
						border: "2px solid #0066FF",
						borderRadius: 2,
						p: 4,
						mb: 6,
					}}
				>
					<Typography
						variant="h6"
						sx={{
							fontWeight: 800,
							color: "#0066FF",
							mb: 3,
							fontSize: "1.25rem",
						}}
					>
						Índice Rápido
					</Typography>
					<List dense>
						{sections.map((section) => (
							<ListItem
								key={section.id}
								component="a"
								href={`#${section.id}`}
								sx={{
									color: "#1F2937",
									textDecoration: "none",
									py: 1,
									"&:hover": {
										color: "#0066FF",
										bgcolor: "#F8FBFF",
										borderRadius: 1,
									},
									transition: "all 0.2s ease",
								}}
							>
								<ListItemText
									primary={`${section.number}. ${section.title}`}
									primaryTypographyProps={{
										fontWeight: 500,
									}}
								/>
							</ListItem>
						))}
					</List>
				</Box>

				{/* Seções */}
				<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
					{/* 1. Coleta de Dados */}
					<Box
						id="coleta-dados"
						sx={{
							bgcolor: "#FFFFFF",
							border: "2px solid #E8F4FF",
							borderRadius: 2,
							p: { xs: 3, md: 4 },
							scrollMarginTop: "100px",
							"&:hover": {
								borderColor: "#0066FF",
							},
							transition: "border-color 0.3s ease",
						}}
					>
						<Box
							sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}
						>
							<Box
								sx={{
									width: 48,
									height: 48,
									bgcolor: "#0066FF",
									color: "#FFFFFF",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 1.5,
									fontWeight: 800,
									fontSize: "1.25rem",
									flexShrink: 0,
								}}
							>
								01
							</Box>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 800,
									color: "#1F2937",
									fontSize: { xs: "1.5rem", md: "1.75rem" },
								}}
							>
								Coleta e Uso de Dados
							</Typography>
						</Box>

						<Typography sx={{ color: "#6B7280", mb: 2, lineHeight: 1.7 }}>
							Coletamos apenas as informações essenciais para o funcionamento da
							plataforma:
						</Typography>

						<List>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary={
										<>
											<strong>Dados de cadastro:</strong> nome, e-mail e senha
											criptografada
										</>
									}
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary={
										<>
											<strong>Transações financeiras:</strong> valores, datas,
											categorias e descrições que você registra
										</>
									}
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary={
										<>
											<strong>Dados de uso:</strong> informações sobre como você
											interage com a plataforma para melhorias
										</>
									}
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
						</List>

						<Alert
							severity="success"
							sx={{
								mt: 2,
								bgcolor: "#E8F4FF",
								color: "#0066FF",
								"& .MuiAlert-icon": { color: "#0066FF" },
							}}
						>
							Não vendemos seus dados para terceiros
						</Alert>
					</Box>

					{/* 2. Responsabilidade do Usuário */}
					<Box
						id="responsabilidade"
						sx={{
							bgcolor: "#FFFFFF",
							border: "2px solid #E8F4FF",
							borderRadius: 2,
							p: { xs: 3, md: 4 },
							scrollMarginTop: "100px",
							"&:hover": {
								borderColor: "#0066FF",
							},
							transition: "border-color 0.3s ease",
						}}
					>
						<Box
							sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}
						>
							<Box
								sx={{
									width: 48,
									height: 48,
									bgcolor: "#00D4FF",
									color: "#FFFFFF",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 1.5,
									fontWeight: 800,
									fontSize: "1.25rem",
									flexShrink: 0,
								}}
							>
								02
							</Box>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 800,
									color: "#1F2937",
									fontSize: { xs: "1.5rem", md: "1.75rem" },
								}}
							>
								Responsabilidade do Usuário
							</Typography>
						</Box>

						<Typography
							sx={{ color: "#6B7280", mb: 2, lineHeight: 1.7, fontWeight: 600 }}
						>
							Você é responsável por:
						</Typography>

						<List>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#00D4FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Fornecer informações verdadeiras e atualizadas"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#00D4FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Manter suas credenciais de acesso seguras e confidenciais"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#00D4FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Não compartilhar sua conta com terceiros"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#00D4FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Usar a plataforma de forma ética e legal"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
						</List>

						<Alert severity="error" icon={<Warning />} sx={{ mt: 2 }}>
							O Kado não se responsabiliza por perdas decorrentes de uso
							indevido de sua conta.
						</Alert>
					</Box>

					{/* 3. Privacidade e LGPD */}
					<Box
						id="privacidade"
						sx={{
							bgcolor: "#FFFFFF",
							border: "2px solid #E8F4FF",
							borderRadius: 2,
							p: { xs: 3, md: 4 },
							scrollMarginTop: "100px",
							"&:hover": {
								borderColor: "#0066FF",
							},
							transition: "border-color 0.3s ease",
						}}
					>
						<Box
							sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}
						>
							<Box
								sx={{
									width: 48,
									height: 48,
									bgcolor: "#0066FF",
									color: "#FFFFFF",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 1.5,
									fontWeight: 800,
									fontSize: "1.25rem",
									flexShrink: 0,
								}}
							>
								03
							</Box>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 800,
									color: "#1F2937",
									fontSize: { xs: "1.5rem", md: "1.75rem" },
								}}
							>
								Privacidade e LGPD
							</Typography>
						</Box>

						<Typography sx={{ color: "#6B7280", mb: 2, lineHeight: 1.7 }}>
							Tratamos seus dados pessoais em conformidade com a{" "}
							<strong>Lei Geral de Proteção de Dados (LGPD)</strong>.
						</Typography>

						<Typography sx={{ color: "#6B7280", mb: 2, fontWeight: 600 }}>
							Seus direitos:
						</Typography>

						<List>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Solicitar acesso aos seus dados pessoais"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Corrigir dados incompletos ou desatualizados"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Solicitar a exclusão de seus dados"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Revogar o consentimento de uso de dados"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Solicitar portabilidade dos seus dados"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
						</List>

						<Typography sx={{ color: "#0066FF", fontWeight: 700, mt: 2 }}>
							Armazenamos dados apenas pelo tempo necessário para fornecer
							nossos serviços.
						</Typography>
					</Box>

					{/* 4. Alterações nos Termos */}
					<Box
						id="alteracoes"
						sx={{
							bgcolor: "#FFFFFF",
							border: "2px solid #E8F4FF",
							borderRadius: 2,
							p: { xs: 3, md: 4 },
							scrollMarginTop: "100px",
							"&:hover": {
								borderColor: "#0066FF",
							},
							transition: "border-color 0.3s ease",
						}}
					>
						<Box
							sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}
						>
							<Box
								sx={{
									width: 48,
									height: 48,
									bgcolor: "#00D4FF",
									color: "#FFFFFF",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 1.5,
									fontWeight: 800,
									fontSize: "1.25rem",
									flexShrink: 0,
								}}
							>
								04
							</Box>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 800,
									color: "#1F2937",
									fontSize: { xs: "1.5rem", md: "1.75rem" },
								}}
							>
								Alterações nos Termos
							</Typography>
						</Box>

						<Typography sx={{ color: "#6B7280", mb: 2, lineHeight: 1.7 }}>
							Podemos atualizar estes termos periodicamente para refletir
							mudanças em nossas práticas ou por razões legais.
						</Typography>

						<Typography sx={{ color: "#6B7280", mb: 2, lineHeight: 1.7 }}>
							Quando houver alterações significativas, notificaremos você por
							e-mail ou através de um aviso na plataforma.
						</Typography>

						<Typography
							sx={{ color: "#1F2937", fontWeight: 700, lineHeight: 1.7 }}
						>
							Ao continuar usando a plataforma após as alterações, você aceita
							os novos termos.
						</Typography>
					</Box>

					{/* 5. Uso dos Dados Financeiros */}
					<Box
						id="dados-financeiros"
						sx={{
							bgcolor: "#FFFFFF",
							border: "2px solid #E8F4FF",
							borderRadius: 2,
							p: { xs: 3, md: 4 },
							scrollMarginTop: "100px",
							"&:hover": {
								borderColor: "#0066FF",
							},
							transition: "border-color 0.3s ease",
						}}
					>
						<Box
							sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}
						>
							<Box
								sx={{
									width: 48,
									height: 48,
									bgcolor: "#0066FF",
									color: "#FFFFFF",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 1.5,
									fontWeight: 800,
									fontSize: "1.25rem",
									flexShrink: 0,
								}}
							>
								05
							</Box>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 800,
									color: "#1F2937",
									fontSize: { xs: "1.5rem", md: "1.75rem" },
								}}
							>
								Uso dos Dados Financeiros
							</Typography>
						</Box>

						<Alert
							severity="success"
							sx={{
								mb: 3,
								bgcolor: "#E8F4FF",
								color: "#0066FF",
								"& .MuiAlert-icon": { color: "#0066FF" },
							}}
						>
							Seus dados financeiros são privados e nunca serão compartilhados
							ou vendidos.
						</Alert>

						<Typography sx={{ color: "#6B7280", mb: 2, lineHeight: 1.7 }}>
							O <strong>Kado</strong> não utiliza seus dados financeiros para:
						</Typography>

						<List>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Publicidade direcionada"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Análises de terceiros"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Venda para empresas parceiras"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Qualquer finalidade não autorizada por você"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
						</List>

						<Typography
							sx={{ color: "#1F2937", fontWeight: 700, mt: 2, lineHeight: 1.7 }}
						>
							Todas as informações são exclusivamente visíveis para você.
						</Typography>
					</Box>

					{/* 6. Segurança e Armazenamento */}
					<Box
						id="seguranca"
						sx={{
							bgcolor: "#FFFFFF",
							border: "2px solid #E8F4FF",
							borderRadius: 2,
							p: { xs: 3, md: 4 },
							scrollMarginTop: "100px",
							"&:hover": {
								borderColor: "#0066FF",
							},
							transition: "border-color 0.3s ease",
						}}
					>
						<Box
							sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}
						>
							<Box
								sx={{
									width: 48,
									height: 48,
									bgcolor: "#00D4FF",
									color: "#FFFFFF",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 1.5,
									fontWeight: 800,
									fontSize: "1.25rem",
									flexShrink: 0,
								}}
							>
								06
							</Box>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 800,
									color: "#1F2937",
									fontSize: { xs: "1.5rem", md: "1.75rem" },
								}}
							>
								Segurança e Armazenamento
							</Typography>
						</Box>

						<Typography sx={{ color: "#6B7280", mb: 2, fontWeight: 600 }}>
							Medidas de segurança implementadas:
						</Typography>

						<List>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#00D4FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Criptografia de ponta a ponta para senhas"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#00D4FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Conexões HTTPS seguras"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#00D4FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Autenticação segura"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
						</List>

						<Typography sx={{ color: "#6B7280", mt: 2, lineHeight: 1.7 }}>
							Não compartilhamos dados com terceiros sem seu consentimento
							explícito, exceto quando exigido por lei.
						</Typography>
					</Box>

					{/* 7. Limitação de Responsabilidade */}
					<Box
						id="limitacao"
						sx={{
							bgcolor: "#FFFFFF",
							border: "2px solid #E8F4FF",
							borderRadius: 2,
							p: { xs: 3, md: 4 },
							scrollMarginTop: "100px",
							"&:hover": {
								borderColor: "#0066FF",
							},
							transition: "border-color 0.3s ease",
						}}
					>
						<Box
							sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}
						>
							<Box
								sx={{
									width: 48,
									height: 48,
									bgcolor: "#0066FF",
									color: "#FFFFFF",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 1.5,
									fontWeight: 800,
									fontSize: "1.25rem",
									flexShrink: 0,
								}}
							>
								07
							</Box>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 800,
									color: "#1F2937",
									fontSize: { xs: "1.5rem", md: "1.75rem" },
								}}
							>
								Limitação de Responsabilidade
							</Typography>
						</Box>

						<Typography sx={{ color: "#6B7280", mb: 2, lineHeight: 1.7 }}>
							O <strong>Kado</strong> é uma ferramenta de organização financeira
							pessoal e não oferece:
						</Typography>

						<List>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Consultoria financeira profissional"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Recomendações de investimento"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Serviços bancários ou de pagamento"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Garantias de resultados financeiros"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
						</List>

						<Alert severity="info" sx={{ mt: 2 }}>
							Não nos responsabilizamos por decisões financeiras tomadas com
							base nas informações registradas na plataforma.
						</Alert>
					</Box>

					{/* 8. Propriedade Intelectual */}
					<Box
						id="propriedade"
						sx={{
							bgcolor: "#FFFFFF",
							border: "2px solid #E8F4FF",
							borderRadius: 2,
							p: { xs: 3, md: 4 },
							scrollMarginTop: "100px",
							"&:hover": {
								borderColor: "#0066FF",
							},
							transition: "border-color 0.3s ease",
						}}
					>
						<Box
							sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}
						>
							<Box
								sx={{
									width: 48,
									height: 48,
									bgcolor: "#00D4FF",
									color: "#FFFFFF",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 1.5,
									fontWeight: 800,
									fontSize: "1.25rem",
									flexShrink: 0,
								}}
							>
								08
							</Box>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 800,
									color: "#1F2937",
									fontSize: { xs: "1.5rem", md: "1.75rem" },
								}}
							>
								Propriedade Intelectual
							</Typography>
						</Box>

						<Typography sx={{ color: "#6B7280", mb: 2, lineHeight: 1.7 }}>
							Todo o conteúdo da plataforma, incluindo design, código, logos e
							textos, é propriedade do <strong>Kado</strong>.
						</Typography>

						<Typography sx={{ color: "#6B7280", mb: 2, lineHeight: 1.7 }}>
							Você não pode copiar, modificar, distribuir ou usar nosso conteúdo
							sem autorização prévia por escrito.
						</Typography>

						<Typography
							sx={{ color: "#1F2937", fontWeight: 700, lineHeight: 1.7 }}
						>
							Seus dados financeiros e registros continuam sendo sua propriedade
							exclusiva.
						</Typography>
					</Box>

					{/* 9. Cancelamento de Conta */}
					<Box
						id="cancelamento"
						sx={{
							bgcolor: "#FFFFFF",
							border: "2px solid #E8F4FF",
							borderRadius: 2,
							p: { xs: 3, md: 4 },
							scrollMarginTop: "100px",
							"&:hover": {
								borderColor: "#0066FF",
							},
							transition: "border-color 0.3s ease",
						}}
					>
						<Box
							sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}
						>
							<Box
								sx={{
									width: 48,
									height: 48,
									bgcolor: "#0066FF",
									color: "#FFFFFF",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 1.5,
									fontWeight: 800,
									fontSize: "1.25rem",
									flexShrink: 0,
								}}
							>
								09
							</Box>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 800,
									color: "#1F2937",
									fontSize: { xs: "1.5rem", md: "1.75rem" },
								}}
							>
								Cancelamento de Conta
							</Typography>
						</Box>

						<Typography sx={{ color: "#6B7280", mb: 2, lineHeight: 1.7 }}>
							Você pode cancelar sua conta a qualquer momento através das
							configurações da plataforma.
						</Typography>

						<Typography sx={{ color: "#6B7280", mb: 2, fontWeight: 600 }}>
							Ao cancelar sua conta:
						</Typography>

						<List>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Seus dados serão permanentemente excluídos em até 30 dias"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Você perderá acesso a todos os registros financeiros"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<CheckCircle sx={{ color: "#0066FF", fontSize: 20 }} />
								</ListItemIcon>
								<ListItemText
									primary="Não será possível recuperar os dados após a exclusão"
									primaryTypographyProps={{ color: "#6B7280" }}
								/>
							</ListItem>
						</List>

						<Typography sx={{ color: "#0066FF", fontWeight: 700, mt: 2 }}>
							Recomendamos exportar seus dados antes de cancelar a conta.
						</Typography>
					</Box>

					{/* 10. Contato */}
					<Box
						id="contato"
						sx={{
							bgcolor: "#E8F4FF",
							border: "2px solid #0066FF",
							borderRadius: 2,
							p: { xs: 3, md: 4 },
							scrollMarginTop: "100px",
						}}
					>
						<Box
							sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}
						>
							<Box
								sx={{
									width: 48,
									height: 48,
									bgcolor: "#0066FF",
									color: "#FFFFFF",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									borderRadius: 1.5,
									fontWeight: 800,
									fontSize: "1.25rem",
									flexShrink: 0,
								}}
							>
								10
							</Box>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 800,
									color: "#0066FF",
									fontSize: { xs: "1.5rem", md: "1.75rem" },
								}}
							>
								Contato
							</Typography>
						</Box>

						<Typography sx={{ color: "#1F2937", mb: 3, lineHeight: 1.7 }}>
							Para dúvidas, sugestões ou exercer seus direitos sob a LGPD, entre
							em contato:
						</Typography>

						<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<Email sx={{ color: "#0066FF" }} />
								<Typography sx={{ fontWeight: 600, color: "#1F2937" }}>
									E-mail:
									<Link
										href="mailto:suporte@kado.com"
										sx={{
											ml: 1,
											color: "#0066FF",
											textDecoration: "none",
											"&:hover": { textDecoration: "underline" },
										}}
									>
										suporte@kado.com
									</Link>
								</Typography>
							</Box>

							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<Language sx={{ color: "#0066FF" }} />
								<Typography sx={{ fontWeight: 600, color: "#1F2937" }}>
									Site:
									<Link
										href="/inicio"
										sx={{
											ml: 1,
											color: "#0066FF",
											textDecoration: "none",
											"&:hover": { textDecoration: "underline" },
										}}
									>
										www.kado.com
									</Link>
								</Typography>
							</Box>
						</Box>

						<Typography sx={{ color: "#6B7280", fontSize: "0.875rem", mt: 3 }}>
							Tempo médio de resposta: 48 horas úteis
						</Typography>
					</Box>
				</Box>

				{/* Botões de ação */}
				<Divider sx={{ my: 6, borderColor: "#E8F4FF" }} />

				<Box
					sx={{
						display: "flex",
						gap: 2,
						flexDirection: { xs: "column", sm: "row" },
					}}
				>
					<Button
						variant="contained"
						size="large"
						startIcon={<Home />}
						onClick={() => navigate("/inicio")}
						sx={{
							bgcolor: "#0066FF",
							px: 4,
							py: 1.75,
							fontSize: "1rem",
							fontWeight: 600,
							textTransform: "none",
							borderRadius: 2,
							"&:hover": {
								bgcolor: "#0052CC",
							},
						}}
					>
						Voltar para o início
					</Button>

					<Button
						variant="outlined"
						size="large"
						startIcon={<Print />}
						onClick={() => window.print()}
						sx={{
							borderColor: "#0066FF",
							color: "#0066FF",
							px: 4,
							py: 1.75,
							fontSize: "1rem",
							fontWeight: 600,
							textTransform: "none",
							borderRadius: 2,
							borderWidth: 2,
							"&:hover": {
								borderWidth: 2,
								bgcolor: "#F8FBFF",
							},
						}}
					>
						Imprimir termos
					</Button>
				</Box>
			</Container>
		</Box>
	);
};
