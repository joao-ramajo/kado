import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { instance, type LaravelValidationError } from "../../../api/instance";
import type { CreateCategoryFormData } from "../schemas/createCategory.schema";

export type UpdateCategoryFormData = CreateCategoryFormData & {
	id: number;
};

export type UpdateCategoryResponse = {
	message: string;
};

export const putUpdateCategory = async (data: UpdateCategoryFormData) => {
	const response = await instance.put(`/categories/${data.id}`, {
		name: data.name,
		color: data.color,
	});

	return response.data;
};

export function useUpdateCategoryMutation() {
	return useMutation<
		UpdateCategoryResponse,
		AxiosError<LaravelValidationError>,
		UpdateCategoryFormData
	>({
		mutationFn: putUpdateCategory,
	});
}
