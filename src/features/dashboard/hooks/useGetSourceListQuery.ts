import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../api/instance";

export type Source = {
	id: number;
	user_id: number;
	name: string;
	is_default: boolean;
	allow_negative: boolean;
	created_at: string;
	updated_at: string;
};

export type GetSourceResponse = Source[];

export const getSource = async (): Promise<GetSourceResponse> => {
	const response = await instance.get<GetSourceResponse>("/users/sources");
	return response.data;
};

export const useGetSourceQuery = () => {
	return useQuery({
		queryKey: ["user-sources"],
		queryFn: getSource,
	});
};
