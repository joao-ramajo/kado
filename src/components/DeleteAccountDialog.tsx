// DeleteAccountDialog.tsx
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";

type DeleteAccountDialogProps = {
	open: boolean;
	onClose: () => void;
	userName: string;
};

export function DeleteAccountDialog({
	open,
	onClose,
	userName,
}: DeleteAccountDialogProps) {
	const [confirmation, setConfirmation] = useState("");
	const CONFIRM_TEXT = "EXCLUIR";

	const handleDelete = () => {
		// Implementar a exclusão da conta
		console.log("Deletando conta...");
		onClose();
	};

	const handleClose = () => {
		setConfirmation("");
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="sm"
			fullWidth
			PaperProps={{
				sx: {
					borderRadius: 2,
				},
			}}
		>
			<DialogTitle sx={{ pb: 2 }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
					<Box
						sx={{
							width: 40,
							height: 40,
							borderRadius: 2,
							bgcolor: "error.lighter",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<WarningAmberIcon sx={{ color: "error.main" }} />
					</Box>
					<Typography variant="h6" fontWeight={700}>
						Excluir conta
					</Typography>
				</Box>
			</DialogTitle>

			<DialogContent sx={{ pb: 2 }}>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<Typography variant="body2" color="text.secondary">
						Você está prestes a excluir permanentemente a conta de{" "}
						<strong>{userName}</strong>.
					</Typography>

					<Box
						sx={{
							p: 2,
							borderRadius: 2,
							bgcolor: "error.lighter",
							border: 1,
							borderColor: "error.light",
						}}
					>
						<Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
							⚠️ Esta ação é irreversível e irá:
						</Typography>
						<Box component="ul" sx={{ m: 0, pl: 2.5 }}>
							<Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
								Excluir todas as suas despesas e receitas
							</Typography>
							<Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
								Remover todas as suas categorias
							</Typography>
							<Typography component="li" variant="body2">
								Apagar permanentemente todos os seus dados
							</Typography>
						</Box>
					</Box>

					<Box>
						<Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
							Para confirmar, digite <strong>{CONFIRM_TEXT}</strong> abaixo:
						</Typography>
						<TextField
							fullWidth
							placeholder={CONFIRM_TEXT}
							value={confirmation}
							onChange={(e) => setConfirmation(e.target.value.toUpperCase())}
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
								},
							}}
						/>
					</Box>
				</Box>
			</DialogContent>

			<DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
				<Button
					onClick={handleClose}
					sx={{
						textTransform: "none",
						borderRadius: 2,
						px: 3,
					}}
				>
					Cancelar
				</Button>
				<Button
					onClick={handleDelete}
					variant="contained"
					color="error"
					disabled={confirmation !== CONFIRM_TEXT}
					sx={{
						textTransform: "none",
						borderRadius: 2,
						px: 3,
					}}
				>
					Excluir permanentemente
				</Button>
			</DialogActions>
		</Dialog>
	);
}
