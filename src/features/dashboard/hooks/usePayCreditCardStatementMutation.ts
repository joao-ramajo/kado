import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { instance, type LaravelValidationError } from "../../../api/instance";

type PayCreditCardStatementPayload = {
	statementId: number;
	payment_source_id: number;
};

export type PayCreditCardStatementResponse = {
	message: string;
};

export const postPayCreditCardStatement = async ({
	statementId,
	payment_source_id,
}: PayCreditCardStatementPayload) => {
	const response = await instance.post<PayCreditCardStatementResponse>(
		`/credit-cards/statements/${statementId}/pay`,
		{
			payment_source_id,
		},
	);

	return response.data;
};

export function usePayCreditCardStatementMutation() {
	return useMutation<
		PayCreditCardStatementResponse,
		AxiosError<LaravelValidationError>,
		PayCreditCardStatementPayload
	>({
		mutationFn: postPayCreditCardStatement,
	});
}
