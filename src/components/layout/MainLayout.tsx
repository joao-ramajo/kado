import { Box } from "@mui/material";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { UsageTipsWidget } from "./UsageTipsWidget";

type MainLayoutProps = {
	children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Header />

			{/* Conteúdo principal */}
			<Box component="main" sx={{ flex: 1 }}>
				{children}
			</Box>

			<Footer />
			<UsageTipsWidget />
		</Box>
	);
}
