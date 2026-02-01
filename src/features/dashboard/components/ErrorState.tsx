import { ErrorOutline, Refresh } from "@mui/icons-material";
import { Alert, AlertTitle, Button, Typography } from "@mui/material";

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => {
	return (
		<Alert
			severity="error"
			sx={{
				borderRadius: 2,
				alignItems: "center",
			}}
			action={
				<Button
					color="inherit"
					size="small"
					startIcon={<Refresh />}
					onClick={onRetry}
					sx={{ textTransform: "none", fontWeight: 600 }}
				>
					Tentar novamente
				</Button>
			}
			icon={<ErrorOutline fontSize="large" />}
		>
			<AlertTitle sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
				Erro ao carregar despesas
			</AlertTitle>
			<Typography variant="body2">
				Não foi possível carregar suas despesas. Verifique sua conexão com a
				internet e tente novamente.
			</Typography>
		</Alert>
	);
};
