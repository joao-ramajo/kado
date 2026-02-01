import { Box, Container, Typography } from "@mui/material";

export function Footer() {
	return (
		<Box component="footer" sx={{ mt: 6 }}>
			<Container maxWidth="lg">
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						flexWrap: "wrap",
						gap: 4,
						py: 4,
					}}
				>
					{/* Coluna 1 */}
					<Box>
						<Typography variant="h6">Kado</Typography>
						<Typography variant="body2">
							Controle financeiro sem complicação.
						</Typography>
					</Box>

					{/* Coluna 2 */}
					<Box>
						<Typography variant="subtitle1">Navegação</Typography>
						<Typography variant="body2">Início</Typography>
						<Typography variant="body2">Funcionalidades</Typography>
						<Typography variant="body2">Criar Conta</Typography>
					</Box>

					{/* Coluna 3 */}
					<Box>
						<Typography variant="subtitle1">Recursos</Typography>
						<Typography variant="body2">Em breve...</Typography>
					</Box>

					{/* Coluna 4 */}
					<Box>
						<Typography variant="subtitle1">Suporte</Typography>
						<Typography variant="body2">suporte@kado.com</Typography>
					</Box>
				</Box>

				{/* Linha inferior */}
				<Box sx={{ py: 2 }}>
					<Typography variant="body2" align="center">
						© 2026 Kado. Todos os direitos reservados.
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}
