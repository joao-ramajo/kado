import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./features/auth/context/AuthContext.tsx";

const root = document.getElementById("root");
const queryClient = new QueryClient();

if (!root) {
	throw new Error("Root element not found");
}

createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Toaster position="bottom-center" />
				<App />
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>,
);
