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
	previousExpenses: Array<[readonly unknown[], Expense[] | undefined]>;
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

			const previousExpenses = queryClient.getQueriesData<Expense[]>({
				queryKey: ["dashboard-expenses"],
			});

			for (const [queryKey] of previousExpenses) {
				queryClient.setQueryData<Expense[]>(queryKey, (old) =>
					old?.filter((expense) => expense.id !== id),
				);
			}

			return { previousExpenses };
		},
		onSuccess: (response) => {
			toast.success(response.message);
		},

		onError: (error, _vars, context) => {
			if (context?.previousExpenses.length) {
				for (const [queryKey, previousExpenses] of context.previousExpenses) {
					queryClient.setQueryData(queryKey, previousExpenses);
				}
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
