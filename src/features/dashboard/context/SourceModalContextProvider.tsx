import { createContext, useCallback, useContext, useState } from "react";
import { CreateSourceModal } from "../components/CreateSourceModal";
import type { Source } from "../hooks/useGetSourceListQuery";

type ActionType = "create" | "edit" | null;

const ActionContext = createContext<{
	selectAction: (type: ActionType, item?: Source) => void;
	clearAction: () => void;
}>({
	selectAction: () => {},
	clearAction: () => {},
});

export const useSourceModalContext = () => {
	return useContext(ActionContext);
};

interface SourceModalContextProviderProps {
	children: React.ReactNode;
}

const SourceModalContextProvider = ({
	children,
}: SourceModalContextProviderProps) => {
	const [type, setType] = useState<ActionType>(null);
	const [_item, setItem] = useState<Source | undefined>(undefined);

	const selectAction = useCallback((actionType: ActionType, item?: Source) => {
		setType(actionType);
		setItem(item);
	}, []);

	const clearAction = useCallback(() => {
		setType(null);
		setItem(undefined);
	}, []);

	return (
		<ActionContext.Provider value={{ selectAction, clearAction }}>
			<CreateSourceModal open={type === "create"} onClose={clearAction} />
			{children}
		</ActionContext.Provider>
	);
};

export default SourceModalContextProvider;
