import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { LaravelValidationError } from "../../../api/instance";
import { formatCurrency } from "../../../utils/formatCurrency";
import type { CreditCardStatementSummary } from "../hooks/useGetSourceDetailsQuery";
import type { Source } from "../hooks/useGetSourceListQuery";
import { usePayCreditCardStatementMutation } from "../hooks/usePayCreditCardStatementMutation";

type PayCreditCardStatementDialogProps = {
	open: boolean;
	onClose: () => void;
	cardName: string;
	statement: CreditCardStatementSummary | null;
	sources: Source[];
};

export function PayCreditCardStatementDialog({
	open,
	onClose,
	cardName,
	statement,
	sources,
}: PayCreditCardStatementDialogProps) {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending } = usePayCreditCardStatementMutation();

	const cashSources = useMemo(
		() => sources.filter((source) => source.type === "cash_like"),
		[sources],
	);
	const defaultCashSource =
		cashSources.find((source) => source.is_default) ?? cashSources[0];
	const [paymentSourceId, setPaymentSourceId] = useState<number | "">("");

	useEffect(() => {
		if (open) {
			setPaymentSourceId(defaultCashSource?.id ?? "");
		}
	}, [defaultCashSource?.id, open]);

	if (!statement) {
		return null;
	}

	const handleSubmit = async () => {
		if (!paymentSourceId) {
			toast.error("Selecione uma fonte para pagar a fatura.");
			return;
		}

		try {
			const response = await mutateAsync({
				statementId: statement.id,
				payment_source_id: Number(paymentSourceId),
			});

			queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard-sources"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard-expenses"] });
			toast.success(response.message);
			onClose();
		} catch (error) {
			const axiosError = error as AxiosError<LaravelValidationError>;
			const message =
				axiosError.response?.data?.message ??
				"Não foi possível pagar a fatura.";
			toast.error(message);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
			<DialogTitle>Pagar fatura</DialogTitle>
			<DialogContent sx={{ display: "grid", gap: 2, pt: 2 }}>
				<Typography variant="body2" color="text.secondary">
					{cardName} • referência{" "}
					{new Date(statement.reference_month).toLocaleDateString("pt-BR", {
						month: "2-digit",
						year: "numeric",
					})}
				</Typography>
				<Typography variant="h5" fontWeight={700}>
					{formatCurrency(statement.total_amount)}
				</Typography>
				<FormControl fullWidth>
					<InputLabel id="payment-source-label">Fonte de pagamento</InputLabel>
					<Select
						labelId="payment-source-label"
						label="Fonte de pagamento"
						value={paymentSourceId}
						onChange={(event) => setPaymentSourceId(Number(event.target.value))}
					>
						{cashSources.map((source) => (
							<MenuItem key={source.id} value={source.id}>
								{source.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={isPending}>
					Cancelar
				</Button>
				<Button
					variant="contained"
					onClick={handleSubmit}
					disabled={isPending || !cashSources.length}
				>
					{isPending ? "Pagando..." : "Pagar fatura"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
