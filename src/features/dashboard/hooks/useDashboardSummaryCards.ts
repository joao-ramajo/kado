import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { instance, type LaravelValidationError } from "../../../api/instance";
import {
	DEFAULT_DASHBOARD_SUMMARY_CARD_IDS,
	type SummaryCardId,
} from "../constants/summaryCards";

type GetDashboardSummaryCardsResponse = {
	card_ids: SummaryCardId[];
};

type UpdateDashboardSummaryCardsPayload = {
	card_ids: SummaryCardId[];
};

export const getDashboardSummaryCards =
	async (): Promise<GetDashboardSummaryCardsResponse> => {
		const response = await instance.get("/dashboard/summary/cards");

		return response.data;
	};

export const updateDashboardSummaryCards = async (
	payload: UpdateDashboardSummaryCardsPayload,
): Promise<GetDashboardSummaryCardsResponse> => {
	const response = await instance.put("/dashboard/summary/cards", payload);

	return response.data;
};

export const useDashboardSummaryCardsQuery = () => {
	return useQuery({
		queryKey: ["dashboard-summary-cards"],
		queryFn: getDashboardSummaryCards,
		placeholderData: { card_ids: DEFAULT_DASHBOARD_SUMMARY_CARD_IDS },
	});
};

export const useUpdateDashboardSummaryCardsMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<
		GetDashboardSummaryCardsResponse,
		AxiosError<LaravelValidationError>,
		UpdateDashboardSummaryCardsPayload
	>({
		mutationFn: updateDashboardSummaryCards,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["dashboard-summary-cards"],
			});
		},
	});
};
