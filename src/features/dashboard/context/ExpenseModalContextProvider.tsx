import { createContext, useCallback, useContext, useState } from "react";
import { CreateExpenseModal } from "../components/CreateExpenseModal";
import { EditExpenseModal } from "../components/EditExpenseModal";
import type { Expense } from "../hooks/useGetExpense";

type ActionType = "create" | "edit" | null;

const ActionContext = createContext<{
	selectAction: (type: ActionType, item?: Expense) => void;
	clearAction: () => void;
}>({
	selectAction: () => {},
	clearAction: () => {},
});

export const useExpenseModalContext = () => {
	if (!ActionContext) {
		throw new Error(
			"useExpenseModalContext must be used within a StockActionProvider",
		);
	}

	return useContext(ActionContext);
};

interface ExpenseModalContextProviderProps {
	children: React.ReactNode;
}

const ensureHasItem = (item?: Expense) => {
	if (!item) {
		return;
	}

	return item;
};

const ExpenseModalContextProvider = ({
	children,
}: ExpenseModalContextProviderProps) => {
	const [type, setType] = useState<ActionType>(null);
	const [item, setItem] = useState<Expense | undefined>(undefined);

	const selectAction = useCallback((actionType: ActionType, Item?: Expense) => {
		setType(actionType);
		setItem(Item);
	}, []);

	const clearAction = useCallback(() => {
		setType(null);
		setItem(undefined);
	}, []);

	return (
		<ActionContext.Provider value={{ selectAction, clearAction }}>
			<CreateExpenseModal open={type === "create"} onClose={clearAction} />
			{ensureHasItem(item) && (
				<EditExpenseModal
					open={type === "edit"}
					onClose={clearAction}
					expense={item}
				/>
			)}
			{children}
		</ActionContext.Provider>
	);
};

export default ExpenseModalContextProvider;
