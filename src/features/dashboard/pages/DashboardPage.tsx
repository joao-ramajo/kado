import { FinancialSummary } from "../components/FinancialSummary";
import { RecentExpenses } from "../components/RecentExpenses";

export const DashbaordPage = () => {
	return (
		<>
			<FinancialSummary />
			<RecentExpenses />
		</>
	);
};
