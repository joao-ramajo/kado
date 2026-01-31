import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { instance, type LaravelValidationError } from "../../../api/instance";
import type { LoginFormData } from "../schemas/login.schema";

type PostLoginResponse = {
	message: string;
	user: {
		name: string;
	};
	token: string;
};

export const postLogin = async (data: LoginFormData) => {
	const response = await instance.post("/login", data);

	return response.data;
};

export function useLoginMutation() {
	return useMutation<
		PostLoginResponse,
		AxiosError<LaravelValidationError>,
		LoginFormData
	>({
		mutationFn: postLogin,
	});
}
