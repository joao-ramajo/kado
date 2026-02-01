import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { instance, type LaravelValidationError } from "../../../api/instance";
import type { CreateExpenseFormData } from "../schemas/createExpense.schema";

export type CreateExpenseResponse = {
	message: string;
};

export const postCreateExpense = async (data: CreateExpenseFormData) => {
	const response = await instance.post("/expenses", data);

	return response.data;
};

export function useCreateExpenseMutation() {
	return useMutation<
		CreateExpenseResponse,
		AxiosError<LaravelValidationError>,
		CreateExpenseFormData
	>({
		mutationFn: postCreateExpense,
	});
}
