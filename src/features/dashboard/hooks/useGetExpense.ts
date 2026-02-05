import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../api/instance";

export type Expense = {
	id: number;
	title: string;
	category: string | null;
	category_id: number | null;
	amount: number;
	payment_date: string | null;
	due_date: string | null;
	type: "expense" | "income";
	status: "paid" | "pending" | "overdue";
	source_id: number;
	source_name: string;
};

export type GetExpenseResponse = Expense[];

export const getExpenses = async (): Promise<GetExpenseResponse> => {
	const response = await instance.get("/dashboard/expenses");
	return response.data;
};

export const useGetExpensesQuery = () => {
	return useQuery({
		queryKey: ["dashboard-expenses"],
		queryFn: getExpenses,
	});
};
