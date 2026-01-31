import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import { DashbaordPage } from "./features/dashboard/pages/DashboardPage";
import { AboutPage } from "./features/landing/pages/AboutPage";
import { Home } from "./features/landing/pages/Home";

export default function App() {
	return (
		<BrowserRouter>
			<MainLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/cadastre-se" element={<RegisterPage />} />
					<Route path="/dashboard" element={<DashbaordPage />} />
					<Route path="/apoie" element={<AboutPage />} />
				</Routes>
			</MainLayout>
		</BrowserRouter>
	);
}
