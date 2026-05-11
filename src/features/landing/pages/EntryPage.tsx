import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { Home } from "./Home";

export const EntryPage = () => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}

	return <Home />;
};
