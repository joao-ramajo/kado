import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { instance, type LaravelValidationError } from "../../../api/instance";

export type DeleteSourceResponse = {
	message: string;
};

type DeleteSourcePayload = {
	id: number;
};

const deleteSource = async ({ id }: DeleteSourcePayload) => {
	const response = await instance.delete(`/sources/${id}`);

	return response.data as DeleteSourceResponse;
};

export function useDeleteSourceMutation() {
	const queryClient = useQueryClient();

	return useMutation<
		DeleteSourceResponse,
		AxiosError<LaravelValidationError>,
		DeleteSourcePayload
	>({
		mutationFn: deleteSource,
		onSuccess: (response) => {
			toast.success(response.message);
		},
		onError: (error) => {
			const status = error.response?.status;
			const apiError = error.response?.data;

			if (status === 400 && apiError?.message) {
				toast.error(apiError.message);
				return;
			}

			toast.error("Erro inesperado ao realizar a operação.");
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["dashboard-sources"],
			});
			queryClient.invalidateQueries({
				queryKey: ["user-sources"],
			});
			queryClient.invalidateQueries({
				queryKey: ["dashboard-summary"],
			});
			queryClient.invalidateQueries({
				queryKey: ["dashboard-expenses"],
			});
		},
	});
}
