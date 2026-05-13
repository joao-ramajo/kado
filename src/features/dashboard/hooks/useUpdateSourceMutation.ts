import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { instance, type LaravelValidationError } from "../../../api/instance";
import type { CreateSourceFormData } from "../schemas/createSource.schema";

export type UpdateSourceResponse = {
	message: string;
};

export type UpdateSourcePayload = {
	id: number;
	data: CreateSourceFormData;
};

const putUpdateSource = async ({ id, data }: UpdateSourcePayload) => {
	const response = await instance.put(`/sources/${id}`, data);

	return response.data as UpdateSourceResponse;
};

export function useUpdateSourceMutation() {
	return useMutation<
		UpdateSourceResponse,
		AxiosError<LaravelValidationError>,
		UpdateSourcePayload
	>({
		mutationFn: putUpdateSource,
	});
}
