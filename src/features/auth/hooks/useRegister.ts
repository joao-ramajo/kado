import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { instance, type LaravelValidationError } from "../../../api/instance";
import type { RegisterFormData } from "../schemas/register.schema";

export const postRegister = async (data: RegisterFormData) => {
	const response = await instance.post("/register", data);
	return response.data;
};

type PostRegisterResponse = {
	message: string;
	user: {
		name: string;
	};
	token: string;
};

export function useRegisterMutation() {
	return useMutation<
		PostRegisterResponse,
		AxiosError<LaravelValidationError>,
		RegisterFormData
	>({
		mutationFn: postRegister,
	});
}
