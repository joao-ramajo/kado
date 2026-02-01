import { Box, Paper, Skeleton } from "@mui/material";

export const ExpenseItemSkeleton = () => {
	return (
		<Paper
			elevation={0}
			sx={{
				p: { xs: 2, sm: 2.5 },
				border: "1px solid",
				borderColor: "divider",
				borderRadius: 2,
			}}
		>
			<Box
				display="flex"
				flexDirection={{ xs: "column", sm: "row" }}
				gap={{ xs: 2, sm: 3 }}
				alignItems={{ xs: "stretch", sm: "center" }}
			>
				{/* Título e Categoria */}
				<Box flex={1}>
					<Skeleton variant="text" width="60%" height={28} />
					<Skeleton variant="text" width="40%" height={20} />
				</Box>

				{/* Datas */}
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "row", sm: "column" },
						gap: { xs: 2, sm: 0.5 },
						minWidth: { sm: 140 },
					}}
				>
					<Skeleton variant="text" width={100} height={40} />
					<Skeleton variant="text" width={100} height={40} />
				</Box>

				{/* Valor e Status */}
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "row", sm: "column" },
						alignItems: { xs: "center", sm: "flex-end" },
						gap: 1.5,
						minWidth: { sm: 140 },
					}}
				>
					<Skeleton variant="text" width={120} height={32} />
					<Skeleton variant="rounded" width={80} height={24} />
				</Box>
			</Box>
		</Paper>
	);
};
