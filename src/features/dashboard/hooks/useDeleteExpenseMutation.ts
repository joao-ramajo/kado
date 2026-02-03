import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { instance, type LaravelValidationError } from "../../../api/instance";
import type { Expense } from "./useGetExpense";

export type DeleteExpenseResponse = {
	message: string;
};

type DeleteExpenseFormData = {
	id: number;
};

type DeleteContext = {
	previousExpenses?: Expense[];
};

export const deleteExpense = async (data: DeleteExpenseFormData) => {
	const response = await instance.delete(`/expenses/${data.id}`);

	return response.data;
};

export function useDeleteExpenseMutation() {
	const queryClient = useQueryClient();

	return useMutation<
		DeleteExpenseResponse,
		AxiosError<LaravelValidationError>,
		DeleteExpenseFormData,
		DeleteContext
	>({
		mutationFn: deleteExpense,
		onMutate: async ({ id }) => {
			await queryClient.cancelQueries({ queryKey: ["dashboard-expenses"] });

			const previousExpenses = queryClient.getQueryData<Expense[]>([
				"dashboard-expenses",
			]);

			queryClient.setQueryData<Expense[]>(["dashboard-expenses"], (old) =>
				old?.filter((e) => e.id !== id),
			);

			return { previousExpenses };
		},
		onSuccess: (response) => {
			toast.success(response.message);
		},

		onError: (error, _vars, context) => {
			if (context?.previousExpenses) {
				queryClient.setQueryData(
					["dashboard-expenses"],
					context.previousExpenses,
				);
			}

			const status = error.response?.status;
			const apiError = error.response?.data;

			if (status === 400 && apiError?.message) {
				toast.error(apiError.message);
			} else {
				toast.error("Erro inesperado ao realizar a operação.");
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["dashboard-expenses"],
			});
			queryClient.invalidateQueries({
				queryKey: ["dashboard-summary"],
			});
		},
	});
}
