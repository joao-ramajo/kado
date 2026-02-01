import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { instance, type LaravelValidationError } from "../../../api/instance";
import type { CreateCategoryFormData } from "../schemas/createCategory.schema";

export type CreateCategoryResponse = {
	message: string;
};

export const postCreateCategory = async (data: CreateCategoryFormData) => {
	const response = await instance.post(`/categories`, data);

	return response.data;
};

export function useCraeteCategoryMutation() {
	return useMutation<
		CreateCategoryResponse,
		AxiosError<LaravelValidationError>,
		CreateCategoryFormData
	>({
		mutationFn: postCreateCategory,
	});
}
