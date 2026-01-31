// components/CTA.tsx
import { Box, Container, Typography, Button } from "@mui/material";

export function Cta() {
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
            <Button variant="contained" size="large">
              Criar minha carteira
            </Button>
            <Button variant="outlined" size="large">
              Explorar recursos
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
