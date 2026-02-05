import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../api/instance";

export type SourceDetail = {
	id: number;
	name: string;
	color: string;
	expenses_count: number;
	total_income: number;
	total_expense: number;
	balance: number;
};

export type GetSourceDetailsResponse = SourceDetail[];

export const getSourceDetails = async (): Promise<GetSourceDetailsResponse> => {
	const response = await instance.get<GetSourceDetailsResponse>("/sources");
	return response.data;
};

export const getSourceDetailsQuery = () => {
	return useQuery({
		queryKey: ["dashboard-sources"],
		queryFn: getSourceDetails,
	});
};
