// components/RegisterForm.tsx
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

export function RegisterForm() {
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
            Criar conta
          </Typography>

          <TextField
            label="Nome"
            fullWidth
          />

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

          <TextField
            label="Confirmar senha"
            type="password"
            fullWidth
          />

          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography variant="body2">
                Aceito os{" "}
                <Link href="/terms">
                  termos e condições
                </Link>
              </Typography>
            }
          />

          <Button variant="contained" fullWidth>
            Cadastrar
          </Button>

          <Typography variant="body2" align="center">
            Já tem conta?{" "}
            <Link href="/login">
              Entrar
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
