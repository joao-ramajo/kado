import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../api/instance";

export type GetSummaryResponse = {
	total_receive: number;
	total_expense: number;
	expected_total: number;
	final_balance: number;
	total_receive_30_days: number;
	total_expense_30_days: number;
	total_income_pending: number;
	total_expense_pending: number;
	current_balance: number;
	expected_expenses: number;
	spent_today: number;
	spent_month: number;
	credit_card_open_total: number;
	credit_card_limit_used: number;
};

export const getSummary = async (): Promise<GetSummaryResponse> => {
	const response = await instance.get("/dashboard/summary");
	return response.data;
};

export const useGetSummaryQuery = () => {
	return useQuery({
		queryKey: ["dashboard-summary"],
		queryFn: getSummary,
	});
};
