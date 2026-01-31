// components/LoginForm.tsx
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";

export function LoginForm() {
  return (
    <Box component="section" sx={{ py: 10 }}>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h4" align="center">
            Entrar
          </Typography>

          <TextField
            label="Email"
            type="email"
            fullWidth
          />

          <TextField
            label="Senha"
            type="password"
            fullWidth
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Lembrar-me"
          />

          <Button variant="contained" fullWidth>
            Confirmar
          </Button>

          <Typography variant="body2" align="center">
            Não tem login?{" "}
            <Link href="/cadastre-se">
              Cadastre-se
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
