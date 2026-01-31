// components/Features.tsx
import { Box, Container, Typography, Card, CardContent } from "@mui/material";

export function Features() {
  return (
    <Box component="section" sx={{ py: 10 }}>
      <Container maxWidth="lg">
        {/* Título */}
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom>
            O QUE O FILAMENT FAZ
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ferramentas essenciais para manter suas finanças organizadas
          </Typography>
        </Box>

        {/* Cards */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          <Card sx={{ flex: 1, minWidth: 250 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contas claras
              </Typography>
              <Typography variant="body2">
                Cadastre contas de pagamento e recebimento com valores
                fixos ou variáveis.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, minWidth: 250 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Expectativas reais
              </Typography>
              <Typography variant="body2">
                Veja quanto você espera gastar e espera receber
                antes do mês acabar.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, minWidth: 250 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Impacto final
              </Typography>
              <Typography variant="body2">
                O sistema calcula o saldo final projetado
                com base nas suas decisões financeiras.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
