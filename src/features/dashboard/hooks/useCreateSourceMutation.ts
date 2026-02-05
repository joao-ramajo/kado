import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { instance, type LaravelValidationError } from "../../../api/instance";
import type { CreateSourceFormData } from "../schemas/createSource.schema";

export type CreateSourceResponse = {
	message: string;
};

export const postCreateSource = async (data: CreateSourceFormData) => {
	const response = await instance.post(`/sources`, data);

	return response.data;
};

export function useCreateSourceMutation() {
	return useMutation<
		CreateSourceResponse,
		AxiosError<LaravelValidationError>,
		CreateSourceFormData
	>({
		mutationFn: postCreateSource,
	});
}
