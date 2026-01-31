import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { type ApiError, instance } from "../../../api/instance";
import type { RegisterFormData } from "../schemas/register.schema";

export const postRegister = async (data: RegisterFormData) => {
	const response = await instance.post("/register", data);
	return response.data;
};

type PostRegisterResponse = {
	message: string;
	token: string;
};

export function useRegisterMutation() {
	return useMutation<
		PostRegisterResponse,
		AxiosError<ApiError>,
		RegisterFormData
	>({
		mutationFn: postRegister,
		onSuccess: (response) => {
			toast.success(response.message);
		},
	});
}
