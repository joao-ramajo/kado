import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import { DashbaordPage } from "./features/dashboard/pages/DashboardPage";
import { AboutPage } from "./features/landing/pages/AboutPage";
import { GuidePage } from "./features/landing/pages/GuidePage";
import { Home } from "./features/landing/pages/Home";
import { ResourcesPage } from "./features/landing/pages/ResourcePage";
import { TermsPage } from "./features/landing/pages/TermsPage";
import { PrivateRoute } from "./router/PrivateRoute";

export default function App() {
	return (
		<BrowserRouter>
			<MainLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/cadastre-se" element={<RegisterPage />} />
					<Route
						path="/dashboard"
						element={
							<PrivateRoute>
								<DashbaordPage />
							</PrivateRoute>
						}
					/>
					<Route path="/apoie" element={<AboutPage />} />
					<Route path="/termos-e-condicoes" element={<TermsPage />} />
					<Route path="/guia-de-uso" element={<GuidePage />} />
					<Route path="/recursos" element={<ResourcesPage />} />
				</Routes>
			</MainLayout>
		</BrowserRouter>
	);
}
