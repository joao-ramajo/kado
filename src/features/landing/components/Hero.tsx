// components/Hero.tsx
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Hero() {
	const navigate = useNavigate();

	return (
		<Box component="section" sx={{ py: 8 }}>
			<Container maxWidth="lg">
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: 6,
						flexWrap: "wrap",
					}}
				>
					{/* Lado esquerdo */}
					<Box sx={{ maxWidth: 500 }}>
						<Typography variant="h2" gutterBottom>
							Controle Financeiro
						</Typography>

						<Typography variant="h6" gutterBottom>
							sem complicação
						</Typography>

						<Typography variant="body1" sx={{ mb: 3 }}>
							O Wallet é um gerenciador de contas que ajuda você a acompanhar
							pagamentos, recebimentos e controlar seu saldo de forma clara e
							eficiente.
						</Typography>

						<Box display="flex" gap={2}>
							<Button
								variant="contained"
								onClick={() => navigate("/cadastre-se")}
							>
								Começar agora
							</Button>
							<Button variant="outlined">Ver recursos</Button>
						</Box>
					</Box>

					{/* Lado direito (card fake) */}
					<Box
						sx={{
							border: "1px solid",
							borderColor: "divider",
							p: 3,
							minWidth: 320,
						}}
					>
						<Typography variant="subtitle2" gutterBottom>
							Resumo financeiro
						</Typography>

						<Typography>Total recebido: R$ 12.450</Typography>
						<Typography>Total gasto: R$ 8.320</Typography>

						<Typography variant="h6" sx={{ mt: 2 }}>
							Saldo final: R$ 4.130
						</Typography>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
