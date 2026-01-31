// components/CTA.tsx
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Cta() {
	const navigate = useNavigate();

	return (
		<Box component="section" sx={{ py: 10 }}>
			<Container maxWidth="md">
				<Box textAlign="center">
					<Typography variant="h3" gutterBottom>
						PARE DE ADIVINHAR.
						<br />
						VEJA O DINHEIRO COMO ELE É.
					</Typography>

					<Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
						Comece agora a ter controle total sobre suas finanças pessoais
					</Typography>

					<Box display="flex" justifyContent="center" gap={2}>
						<Button
							variant="contained"
							size="large"
							onClick={() => navigate("cadastre-se")}
						>
							Criar minha carteira
						</Button>
						<Button
							variant="outlined"
							size="large"
							onClick={() => navigate("login")}
						>
							Explorar recursos
						</Button>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}
