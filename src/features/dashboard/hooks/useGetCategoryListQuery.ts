import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../api/instance";

export type Category = {
	id: number;
	name: string;
	color: string;
	expenses_count: number;
	expenses_total_amount: number;
};

export type GetCategoryListResponse = Category[];

export const getCategoryList = async (
	month?: number,
): Promise<GetCategoryListResponse> => {
	const response = await instance.get("/categories", {
		params: month ? { month } : undefined,
	});
	return response.data;
};

export const useGetCategoryListQuery = (month?: number) => {
	return useQuery({
		queryKey: ["dashboard-categories", month ?? "all"],
		queryFn: () => getCategoryList(month),
	});
};
