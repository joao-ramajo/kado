import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../api/instance";

export type Category = {
	id: number;
	name: string;
	color: string;
	expenses_count: number;
};

export type GetCategoryListResponse = Category[];

export const getCategoryList = async (): Promise<GetCategoryListResponse> => {
	const response = await instance.get("/categories");
	return response.data;
};

export const useGetCategoryListQuery = () => {
	return useQuery({
		queryKey: ["dashboard-categories"],
		queryFn: getCategoryList,
	});
};
