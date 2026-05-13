import { createContext, useCallback, useContext, useState } from "react";
import { CreateSourceModal } from "../components/CreateSourceModal";
import type { SourceDetail } from "../hooks/useGetSourceDetailsQuery";

type ActionType = "create" | "edit" | null;

const ActionContext = createContext<{
	selectAction: (type: ActionType, item?: SourceDetail) => void;
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
	const [item, setItem] = useState<SourceDetail | undefined>(undefined);

	const selectAction = useCallback((actionType: ActionType, item?: SourceDetail) => {
		setType(actionType);
		setItem(item);
	}, []);

	const clearAction = useCallback(() => {
		setType(null);
		setItem(undefined);
	}, []);

	return (
		<ActionContext.Provider value={{ selectAction, clearAction }}>
			<CreateSourceModal
				open={type !== null}
				mode={type === "edit" ? "edit" : "create"}
				source={item}
				onClose={clearAction}
			/>
			{children}
		</ActionContext.Provider>
	);
};

export default SourceModalContextProvider;
