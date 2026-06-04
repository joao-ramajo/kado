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
	source_type: "cash_like" | "credit_card";
	source_name: string;
	origin_type: "direct" | "credit_card";
	occurrence_type: "direct" | "purchase" | "invoice_payment";
	installment_number: number | null;
	installment_total: number | null;
	purchase_date: string | null;
	credit_card_statement_id: number | null;
	statement_reference_month: string | null;
};

export type GetExpenseResponse = Expense[];

export const getExpenses = async (
	status: "all" | "paid" | "pending",
	query?: string,
	categoryId?: number,
	month?: number,
	sourceId?: number,
): Promise<GetExpenseResponse> => {
	const params: {
		status: "all" | "paid" | "pending";
		query?: string;
		category_id?: number;
		month?: number;
		source_id?: number;
	} = {
		status,
	};

	if (query?.trim()) {
		params.query = query.trim();
	}

	if (categoryId) {
		params.category_id = categoryId;
	}

	if (month) {
		params.month = month;
	}

	if (sourceId) {
		params.source_id = sourceId;
	}

	const response = await instance.get("/dashboard/expenses", {
		params,
	});
	return response.data;
};

export const useGetExpensesQuery = (
	status: "all" | "paid" | "pending",
	query?: string,
	categoryId?: number,
	month?: number,
	sourceId?: number,
) => {
	return useQuery({
		queryKey: [
			"dashboard-expenses",
			status,
			query?.trim() || "",
			categoryId ?? "all-categories",
			month ?? "all-months",
			sourceId ?? "all-sources",
		],
		queryFn: () => getExpenses(status, query, categoryId, month, sourceId),
	});
};
