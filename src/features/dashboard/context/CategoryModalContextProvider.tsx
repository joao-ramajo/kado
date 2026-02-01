import { createContext, useCallback, useContext, useState } from "react";
import { CreateCategoryModal } from "../components/CreateCategoryModal";
import type { Category } from "../hooks/useGetCategoryListQuery";

type ActionType = "create" | "edit" | null;

const ActionContext = createContext<{
	selectAction: (type: ActionType, item?: Category) => void;
	clearAction: () => void;
}>({
	selectAction: () => {},
	clearAction: () => {},
});

export const useCategoryModalContext = () => {
	if (!ActionContext) {
		throw new Error(
			"useCategoryModalContext must be used within a StockActionProvider",
		);
	}

	return useContext(ActionContext);
};

interface CategoryModalContextProviderProps {
	children: React.ReactNode;
}

const CategoryModalContextProvider = ({
	children,
}: CategoryModalContextProviderProps) => {
	const [type, setType] = useState<ActionType>(null);
	const [_item, setItem] = useState<Category | undefined>(undefined);

	const selectAction = useCallback(
		(actionType: ActionType, Item?: Category) => {
			setType(actionType);
			setItem(Item);
		},
		[],
	);

	const clearAction = useCallback(() => {
		setType(null);
		setItem(undefined);
	}, []);

	return (
		<ActionContext.Provider value={{ selectAction, clearAction }}>
			<CreateCategoryModal open={type === "create"} onClose={clearAction} />
			{children}
		</ActionContext.Provider>
	);
};

export default CategoryModalContextProvider;
