import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
	Box,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";

type RecentExpensesFilterProps = {
	value: "all" | "paid" | "pending";
	onChange: (value: "all" | "paid" | "pending") => void;
};

export const RecentExpensesFilter = ({
	value,
	onChange,
}: RecentExpensesFilterProps) => {
	return (
		<Box>
			<Typography
				variant="caption"
				color="text.secondary"
				sx={{ mb: 0.5, display: "block", fontWeight: 600 }}
			>
				Filtrar por
			</Typography>
			<ToggleButtonGroup
				value={value}
				exclusive
				onChange={(_, newValue) => {
					if (newValue !== null) {
						onChange(newValue);
					}
				}}
				size="small"
				sx={{
					bgcolor: "background.paper",
					borderRadius: 2,
					width: { xs: "100%", sm: "auto" },
					display: "flex",
					"& .MuiToggleButtonGroup-grouped": {
						flex: { xs: 1, sm: "0 1 auto" },
						border: 1,
						borderColor: "divider",
						"&:not(:first-of-type)": {
							borderLeft: 1,
							borderLeftColor: "divider",
							marginLeft: 0,
						},
						"&:first-of-type": {
							borderTopLeftRadius: 8,
							borderBottomLeftRadius: 8,
						},
						"&:last-of-type": {
							borderTopRightRadius: 8,
							borderBottomRightRadius: 8,
						},
					},
					"& .MuiToggleButton-root": {
						textTransform: "none",
						fontWeight: 600,
						px: { xs: 1.5, sm: 2.5 },
						py: 1,
						fontSize: { xs: "0.8rem", sm: "0.875rem" },
						gap: { xs: 0.5, sm: 1 },
						transition: "all 0.2s",
						"&.Mui-selected": {
							bgcolor: "primary.main",
							color: "primary.contrastText",
							"&:hover": {
								bgcolor: "primary.dark",
							},
							"& .MuiSvgIcon-root": {
								color: "primary.contrastText",
							},
						},
						"&:hover": {
							bgcolor: "action.hover",
						},
					},
				}}
			>
				<ToggleButton value="all">
					<ViewListIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
					<span
						style={{ display: window.innerWidth < 400 ? "none" : "inline" }}
					>
						Todos
					</span>
				</ToggleButton>
				<ToggleButton value="paid">
					<CheckCircleIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
					<span
						style={{ display: window.innerWidth < 400 ? "none" : "inline" }}
					>
						Pagos
					</span>
				</ToggleButton>
				<ToggleButton value="pending">
					<ScheduleIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
					<span
						style={{ display: window.innerWidth < 400 ? "none" : "inline" }}
					>
						Pendentes
					</span>
				</ToggleButton>
			</ToggleButtonGroup>
		</Box>
	);
};
