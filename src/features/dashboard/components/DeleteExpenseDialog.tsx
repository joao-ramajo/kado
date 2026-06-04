import DeleteIcon from "@mui/icons-material/Delete";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import type { Expense } from "../hooks/useGetExpense";

type DeleteExpenseDialogProps = {
	open: boolean;
	expense: Expense | null;
	onClose: () => void;
	onConfirm: () => void;
};

export function DeleteExpenseDialog({
	open,
	expense,
	onClose,
	onConfirm,
}: DeleteExpenseDialogProps) {
	const handleClose = () => {
		onClose();
	};

	const handleConfirm = () => {
		if (!expense) {
			return;
		}

		onClose();
		onConfirm();
	};

	if (!expense) {
		return null;
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
			<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<DeleteIcon color="error" />
				Excluir despesa
			</DialogTitle>
			<DialogContent sx={{ display: "grid", gap: 1.5, pt: 1 }}>
				<Typography fontWeight={600}>{expense.title}</Typography>
				<Typography variant="body2" color="text.secondary">
					Ao excluir esta despesa, o registro será removido permanentemente.
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Esta ação não pode ser desfeita.
				</Typography>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button
					color="error"
					variant="outlined"
					onClick={handleConfirm}
					sx={{
						borderColor: "error.main",
						color: "error.main",
						"&:hover": {
							borderColor: "error.main",
							bgcolor: "error.main",
							color: "error.contrastText",
						},
					}}
				>
					Excluir
				</Button>
			</DialogActions>
		</Dialog>
	);
}
