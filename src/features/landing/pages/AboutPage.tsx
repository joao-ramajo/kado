import { Box, Button, Container, Paper, Typography } from "@mui/material";

export function AboutPage() {
	return (
		<Container sx={{ py: 8 }}>
			<Box display="flex" flexDirection="column" gap={4}>
				{/* Título */}
				<Box textAlign="center">
					<Typography variant="h4" fontWeight="bold">
						Sobre o projeto
					</Typography>
					<Typography color="text.secondary">
						Independente. Simples. Gratuito.
					</Typography>
				</Box>

				{/* Cards */}
				<Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
					<Paper sx={{ p: 3, flex: 1 }}>
						<Typography fontWeight="bold">A proposta</Typography>
						<Typography color="text.secondary">
							Eliminar a complexidade. Registrar despesas e entradas sem
							ferramentas pesadas.
						</Typography>
					</Paper>

					<Paper sx={{ p: 3, flex: 1 }}>
						<Typography fontWeight="bold">100% gratuito</Typography>
						<Typography color="text.secondary">
							Sem anúncios ou venda de dados. O foco é acessibilidade financeira
							real.
						</Typography>
					</Paper>

					<Paper sx={{ p: 3, flex: 1 }}>
						<Typography fontWeight="bold">Objetividade</Typography>
						<Typography color="text.secondary">
							Feito para quem registra gastos rapidamente, inclusive pelo
							celular no dia a dia.
						</Typography>
					</Paper>
				</Box>

				{/* Apoio */}
				<Paper sx={{ p: 4, textAlign: "center" }}>
					<Typography variant="h5" fontWeight="bold" mb={1}>
						Apoie o projeto
					</Typography>
					<Typography color="text.secondary" mb={2}>
						Contribuições ajudam a manter a infraestrutura e a evolução contínua
						do sistema.
					</Typography>
					<Button variant="contained">Apoiar agora</Button>
				</Paper>
			</Box>
		</Container>
	);
}
