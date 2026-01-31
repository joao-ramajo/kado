import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextData | null>(null);

export type User = {
	name: string;
};

export type AuthContextData = {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (data: { user: User; token: string }) => void;
	logout: () => void;
};

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}

	return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedToken = localStorage.getItem("WALLETTOKEN");
		const storedUser = localStorage.getItem("WALLETUSER");

		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(JSON.parse(storedUser));
		}

		setLoading(false);
	}, []);

	function login(data: { user: User; token: string }) {
		setUser(data.user);
		setToken(data.token);

		localStorage.setItem("WALLETTOKEN", data.token);
		localStorage.setItem("WALLETUSER", JSON.stringify(data.user));
	}

	function logout() {
		setUser(null);
		setToken(null);

		localStorage.removeItem("WALLETTOKEN");
		localStorage.removeItem("WALLETUSER");

		window.location.href = "/login";
	}

	const value: AuthContextData = {
		user,
		token,
		isAuthenticated: !!user,
		login,
		logout,
	};

	if (loading) {
		return null;
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
