// components/RecentExpenses.tsx
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

const data = [
  {
    desc: "Assinatura ChatGPT Go",
    status: "Pago",
    category: "Contas & Serviços",
    type: "Saída",
    value: "- R$ 41,39",
  },
  {
    desc: "Uber",
    status: "Pago",
    category: "Transporte",
    type: "Saída",
    value: "- R$ 16,00",
  },
  {
    desc: "Spotify",
    status: "Pendente",
    category: "Contas & Serviços",
    type: "Saída",
    value: "- R$ 31,90",
  },
];

export function RecentExpenses() {
  return (
    <Box component="section" sx={{ py: 10 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h4">
            Despesas recentes
          </Typography>

          <Box display="flex" gap={2}>
            <Button variant="outlined">
              Exportar dados
            </Button>
            <Button variant="outlined">
              Importar CSV
            </Button>
            <Button variant="contained">
              Nova despesa
            </Button>
          </Box>
        </Box>

        {/* Tabela */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell align="right">Valor</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.desc}</TableCell>

                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === "Pago" ? "success" : "warning"}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <Chip label={row.category} size="small" />
                </TableCell>

                <TableCell>{row.type}</TableCell>

                <TableCell align="right">
                  {row.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
}
