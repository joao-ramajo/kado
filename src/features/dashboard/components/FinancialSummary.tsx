// components/FinancialSummary.tsx
import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Typography,
} from "@mui/material";

export function FinancialSummary() {
	return (
		<Box component="section" sx={{ py: 10 }}>
			<Container maxWidth="lg">
				<Typography variant="h4" gutterBottom>
					Resumo financeiro
				</Typography>

				{/* Cards */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						gap: 3,
						flexWrap: "wrap",
						mb: 4,
					}}
				>
					<Card sx={{ flex: 1, minWidth: 220 }}>
						<CardContent>
							<Typography variant="subtitle2">Total recebido</Typography>
							<Typography variant="h6">R$ 5.143,92</Typography>
						</CardContent>
					</Card>

					<Card sx={{ flex: 1, minWidth: 220 }}>
						<CardContent>
							<Typography variant="subtitle2">Total gasto</Typography>
							<Typography variant="h6">R$ 142,75</Typography>
						</CardContent>
					</Card>

					<Card sx={{ flex: 1, minWidth: 220 }}>
						<CardContent>
							<Typography variant="subtitle2">Saldo esperado</Typography>
							<Typography variant="h6">R$ 4.859,28</Typography>
						</CardContent>
					</Card>
				</Box>

				{/* Botão */}
				<Box textAlign="center">
					<Button variant="contained" size="large">
						Acessar dashboard
					</Button>
				</Box>
			</Container>
		</Box>
	);
}
