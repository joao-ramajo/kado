import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CategoryModalContextProvider from "../context/CategoryModalContextProvider";
import ExpenseModalContextProvider from "../context/ExpenseModalContextProvider";
import SourceModalContextProvider from "../context/SourceModalContextProvider";
import { CategoriesArea } from "./CategoriesArea";
import { FinancialSummary } from "./FinancialSummary";
import { RecentExpenses } from "./RecentExpenses";
import { SourcesArea } from "./SourceArea";

export function Dashboard() {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	const tabs = [
		{
			id: 1,
			label: "Despesas",
			icon: <ReceiptLongIcon />,
			component: (
				<ExpenseModalContextProvider>
					<FinancialSummary />
					<RecentExpenses />
				</ExpenseModalContextProvider>
			),
		},
		{
			id: 2,
			label: "Categorias",
			icon: <CategoryIcon />,
			component: (
				<CategoryModalContextProvider>
					<CategoriesArea />
				</CategoryModalContextProvider>
			),
		},
		{
			id: 3,
			icon: <AccountBalanceWalletIcon />,
			label: "Fontes",
			component: (
				<SourceModalContextProvider>
					<SourcesArea />
				</SourceModalContextProvider>
			),
		},
	];

	return (
		<>
			{/* Header com Breadcrumb */}
			<Box
				sx={{
					px: { xs: 2, sm: 3, md: 4 },
					pb: 2,
					borderBottom: 1,
					borderColor: "divider",
					bgcolor: "background.paper",
				}}
			>
				{/* Tabs Navigation */}
				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					variant="scrollable"
					scrollButtons="auto"
					allowScrollButtonsMobile
					sx={{
						"& .MuiTabs-indicator": {
							height: 3,
							borderRadius: "3px 3px 0 0",
						},
						"& .MuiTab-root": {
							textTransform: "none",
							minHeight: 48,
							fontWeight: 500,
							fontSize: "0.9375rem",
							px: { xs: 2, sm: 3 },
							color: "text.secondary",
							"&.Mui-selected": {
								color: "primary.main",
								fontWeight: 600,
							},
							"&:hover": {
								color: "primary.main",
								bgcolor: "action.hover",
							},
						},
					}}
				>
					{tabs.map((tab) => (
						<Tab
							key={tab.id}
							label={tab.label}
							icon={tab.icon}
							iconPosition="start"
							sx={{
								"& .MuiTab-iconWrapper": {
									mr: 1,
								},
							}}
						/>
					))}
				</Tabs>
			</Box>
			<Box
				sx={{
					px: { xs: 2, sm: 3, md: 4 },
					py: 3,
				}}
			>
				{tabs[activeTab].component}
			</Box>
		</>
	);
}
