import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../api/instance";

import type { SourceType } from "./useGetSourceListQuery";

export type CreditCardStatementSummary = {
	id: number;
	reference_month: string;
	closing_at: string;
	due_at: string;
	status: "open" | "closed" | "paid";
	total_amount: number;
};

export type SourceDetail = {
	id: number;
	name: string;
	type: SourceType;
	color: string;
	is_default: boolean;
	expenses_count: number;
	total_income?: number | null;
	total_expense?: number | null;
	balance?: number | null;
	credit_limit?: number | null;
	used_limit?: number | null;
	available_limit?: number | null;
	current_statement?: CreditCardStatementSummary | null;
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
