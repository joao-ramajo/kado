import { CreateExpenseModal } from "../components/CreateExpenseModal";
import { FinancialSummary } from "../components/FinancialSummary";
import { RecentExpenses } from "../components/RecentExpenses";

export const DashbaordPage = () => {
	return (
		<>
			<FinancialSummary />
			<RecentExpenses />
			<CreateExpenseModal open={true} onClose={() => console.log()} />
		</>
	);
};
