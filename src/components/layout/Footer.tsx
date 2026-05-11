import { GitHub, LinkedIn } from "@mui/icons-material";
import {
	Box,
	Container,
	Divider,
	IconButton,
	Link,
	Typography,
} from "@mui/material";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<Box
			component="footer"
			sx={{
				bgcolor: "#FFFFFF",
				borderTop: "2px solid #E8F4FF",
				mt: "auto",
			}}
		>
			<Container maxWidth="lg">
				{/* Conteúdo principal do footer */}
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: {
							xs: "1fr",
							sm: "repeat(2, 1fr)",
							md: "repeat(4, 1fr)",
						},
						gap: { xs: 4, md: 6 },
						py: { xs: 6, md: 8 },
					}}
				>
					{/* Coluna 1 - Brand */}
					<Box sx={{ gridColumn: { xs: "1", md: "span 1" } }}>
						{/* Logo */}
						<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
							<Box
								sx={{
									width: 36,
									height: 36,
									bgcolor: "#0066FF",
									borderRadius: 1.5,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									mr: 1.5,
								}}
							>
								<Typography
									sx={{
										color: "#FFFFFF",
										fontWeight: 800,
										fontSize: "1.25rem",
									}}
								>
									K
								</Typography>
							</Box>
							<Typography
								variant="h6"
								sx={{
									fontWeight: 800,
									color: "#0066FF",
									fontSize: "1.5rem",
								}}
							>
								Kado
							</Typography>
						</Box>

						<Typography
							variant="body2"
							sx={{
								color: "#6B7280",
								mb: 3,
								lineHeight: 1.6,
								maxWidth: 280,
							}}
						>
							Controle financeiro sem complicação. Gerencie seus gastos de forma
							simples e eficiente.
						</Typography>

						{/* Redes sociais */}
						<Box sx={{ display: "flex", gap: 1 }}>
							<IconButton
								size="small"
								onClick={() =>
									window.open("https://github.com/joao-ramajo/kado", "_blank")
								}
								sx={{
									bgcolor: "#F8FBFF",
									color: "#0066FF",
									"&:hover": {
										bgcolor: "#E8F4FF",
									},
								}}
							>
								<GitHub fontSize="small" />
							</IconButton>
							<IconButton
								onClick={() =>
									window.open(
										"https://www.linkedin.com/in/joao-ramajo",
										"_blank",
									)
								}
								size="small"
								sx={{
									bgcolor: "#F8FBFF",
									color: "#0066FF",
									"&:hover": {
										bgcolor: "#E8F4FF",
									},
								}}
							>
								<LinkedIn fontSize="small" />
							</IconButton>
						</Box>
					</Box>

					{/* Coluna 2 - Navegação */}
					<Box>
						<Typography
							variant="subtitle2"
							sx={{
								fontWeight: 700,
								color: "#1F2937",
								mb: 2,
								fontSize: "0.875rem",
								textTransform: "uppercase",
								letterSpacing: "0.05em",
							}}
						>
							Navegação
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
							<Link
								href="/inicio"
								underline="none"
								sx={{
									color: "#6B7280",
									fontSize: "0.9rem",
									transition: "color 0.2s ease",
									"&:hover": {
										color: "#0066FF",
									},
								}}
							>
								Início
							</Link>
							<Link
								href="#funcionalidades"
								underline="none"
								sx={{
									color: "#6B7280",
									fontSize: "0.9rem",
									transition: "color 0.2s ease",
									"&:hover": {
										color: "#0066FF",
									},
								}}
							>
								Funcionalidades
							</Link>
							<Link
								href="/cadastre-se"
								underline="none"
								sx={{
									color: "#6B7280",
									fontSize: "0.9rem",
									transition: "color 0.2s ease",
									"&:hover": {
										color: "#0066FF",
									},
								}}
							>
								Criar conta
							</Link>
							<Link
								href="/login"
								underline="none"
								sx={{
									color: "#6B7280",
									fontSize: "0.9rem",
									transition: "color 0.2s ease",
									"&:hover": {
										color: "#0066FF",
									},
								}}
							>
								Entrar
							</Link>
						</Box>
					</Box>

					{/* Coluna 3 - Recursos */}
					<Box>
						<Typography
							variant="subtitle2"
							sx={{
								fontWeight: 700,
								color: "#1F2937",
								mb: 2,
								fontSize: "0.875rem",
								textTransform: "uppercase",
								letterSpacing: "0.05em",
							}}
						>
							Recursos
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
							<Link
								href="#"
								underline="none"
								sx={{
									color: "#6B7280",
									fontSize: "0.9rem",
									transition: "color 0.2s ease",
									"&:hover": {
										color: "#0066FF",
									},
								}}
							>
								Gerenciar contas
							</Link>
						</Box>
					</Box>

					{/* Coluna 4 - Suporte */}
					{/* <Box>
						<Typography 
							variant="subtitle2"
							sx={{
								fontWeight: 700,
								color: '#1F2937',
								mb: 2,
								fontSize: '0.875rem',
								textTransform: 'uppercase',
								letterSpacing: '0.05em',
							}}
						>
							Suporte
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
							<Link
								href="#"
								underline="none"
								sx={{
									color: '#6B7280',
									fontSize: '0.9rem',
									transition: 'color 0.2s ease',
									'&:hover': {
										color: '#0066FF',
									},
								}}
							>
								Central de ajuda
							</Link>
							<Link
								href="#"
								underline="none"
								sx={{
									color: '#6B7280',
									fontSize: '0.9rem',
									transition: 'color 0.2s ease',
									'&:hover': {
										color: '#0066FF',
									},
								}}
							>
								Documentação
							</Link>
							<Link
								href="mailto:suporte@kado.com"
								underline="none"
								sx={{
									color: '#6B7280',
									fontSize: '0.9rem',
									display: 'flex',
									alignItems: 'center',
									gap: 0.5,
									transition: 'color 0.2s ease',
									'&:hover': {
										color: '#0066FF',
									},
								}}
							>
								<Email sx={{ fontSize: 16 }} />
								suporte@kado.com
							</Link>
							<Link
								href="#"
								underline="none"
								sx={{
									color: '#6B7280',
									fontSize: '0.9rem',
									transition: 'color 0.2s ease',
									'&:hover': {
										color: '#0066FF',
									},
								}}
							>
								Status do sistema
							</Link>
						</Box>
					</Box> */}
				</Box>

				<Divider sx={{ borderColor: "#F3F4F6" }} />

				{/* Linha inferior */}
				<Box
					sx={{
						py: 4,
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						justifyContent: "space-between",
						alignItems: "center",
						gap: 2,
					}}
				>
					<Typography
						variant="body2"
						sx={{
							color: "#9CA3AF",
							fontSize: "0.875rem",
						}}
					>
						© {currentYear} Kado. Todos os direitos reservados.
					</Typography>

					<Box
						sx={{
							display: "flex",
							gap: 3,
							flexWrap: "wrap",
							justifyContent: "center",
						}}
					>
						{/* <Link
							href="#"
							underline="none"
							sx={{
								color: "#9CA3AF",
								fontSize: "0.875rem",
								transition: "color 0.2s ease",
								"&:hover": {
									color: "#0066FF",
								},
							}}
						>
							Privacidade
						</Link> */}
						<Link
							href="/termos-e-condicoes"
							underline="none"
							sx={{
								color: "#9CA3AF",
								fontSize: "0.875rem",
								transition: "color 0.2s ease",
								"&:hover": {
									color: "#0066FF",
								},
							}}
						>
							Termos de uso
						</Link>
						{/* <Link
							href="#"
							underline="none"
							sx={{
								color: "#9CA3AF",
								fontSize: "0.875rem",
								transition: "color 0.2s ease",
								"&:hover": {
									color: "#0066FF",
								},
							}}
						>
							Cookies
						</Link> */}
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
