import DeleteIcon from "@mui/icons-material/Delete";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useDeleteSourceMutation } from "../hooks/useDeleteSourceMutation";
import type { SourceDetail } from "../hooks/useGetSourceDetailsQuery";

type DeleteSourceDialogProps = {
	open: boolean;
	source: SourceDetail | null;
	onClose: () => void;
};

export function DeleteSourceDialog({
	open,
	source,
	onClose,
}: DeleteSourceDialogProps) {
	const [isConfirming, setIsConfirming] = useState(false);
	const { mutateAsync: deleteSource, isPending } = useDeleteSourceMutation();

	const handleClose = () => {
		if (isPending) {
			return;
		}

		setIsConfirming(false);
		onClose();
	};

	const handleConfirm = async () => {
		if (!source) {
			return;
		}

		setIsConfirming(true);

		try {
			await deleteSource({ id: source.id });
			handleClose();
		} finally {
			setIsConfirming(false);
		}
	};

	if (!source) {
		return null;
	}

	const description =
		source.type === "credit_card"
			? "Ao excluir este cartão, todas as compras e faturas vinculadas serão removidas automaticamente."
			: "Ao excluir esta fonte, todas as despesas vinculadas serão removidas automaticamente.";

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
			<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<DeleteIcon color="error" />
				Excluir fonte
			</DialogTitle>
			<DialogContent sx={{ display: "grid", gap: 1.5, pt: 1 }}>
				<Typography fontWeight={600}>{source.name}</Typography>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Esta ação não pode ser desfeita.
				</Typography>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
				<Button onClick={handleClose} disabled={isPending || isConfirming}>
					Cancelar
				</Button>
				<Button
					color="error"
					variant="contained"
					onClick={handleConfirm}
					disabled={isPending || isConfirming}
				>
					{isPending || isConfirming ? "Excluindo..." : "Excluir"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
