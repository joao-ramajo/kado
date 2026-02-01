import { Home, NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { PageTemplate } from "../../../components/PageTemplate";
import { Dashboard } from "../components/Dashboard";
import ExpenseModalContextProvider from "../context/ExpenseModalContextProvider";

export const DashbaordPage = () => {
	return (
		<ExpenseModalContextProvider>
			<PageTemplate>
				<Breadcrumbs
					separator={<NavigateNext fontSize="small" />}
					sx={{ mb: 4 }}
				>
					<Link
						underline="hover"
						sx={{
							display: "flex",
							alignItems: "center",
							color: "#6B7280",
							"&:hover": { color: "#0066FF" },
						}}
						href="/"
					>
						<Home sx={{ mr: 0.5, fontSize: 18 }} />
						Início
					</Link>
					<Typography sx={{ color: "#0066FF", fontWeight: 600 }}>
						Dashboard
					</Typography>
				</Breadcrumbs>
				<Dashboard />
			</PageTemplate>
		</ExpenseModalContextProvider>
	);
};
