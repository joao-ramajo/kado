import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { instance, type LaravelValidationError } from "../../../api/instance";

type UndoPayCreditCardStatementPayload = {
	statementId: number;
};

export type UndoPayCreditCardStatementResponse = {
	message: string;
};

export const postUndoPayCreditCardStatement = async ({
	statementId,
}: UndoPayCreditCardStatementPayload) => {
	const response = await instance.post<UndoPayCreditCardStatementResponse>(
		`/credit-cards/statements/${statementId}/undo-pay`,
	);

	return response.data;
};

export function useUndoPayCreditCardStatementMutation() {
	return useMutation<
		UndoPayCreditCardStatementResponse,
		AxiosError<LaravelValidationError>,
		UndoPayCreditCardStatementPayload
	>({
		mutationFn: postUndoPayCreditCardStatement,
	});
}
