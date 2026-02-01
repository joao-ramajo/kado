// CategoriesArea.tsx
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	IconButton,
	Typography,
} from "@mui/material";
import { useGetCategoryListQuery } from "../hooks/useGetCategoryListQuery";

export function CategoriesArea() {
	// const categories = [
	// 	{ id: 1, name: "Contas & Serviços", color: "#3b82f6", count: 12 },
	// 	{ id: 2, name: "Alimentação", color: "#10b981", count: 8 },
	// 	{ id: 3, name: "Transporte", color: "#f59e0b", count: 5 },
	// 	{ id: 4, name: "Lazer", color: "#8b5cf6", count: 3 },
	// ];

    const { data } = useGetCategoryListQuery();

    const categories = data ?? [];
	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mb: 3,
				}}
			>
				<Typography variant="h5" sx={{ fontWeight: 600 }}>
					Gerenciar Categorias
				</Typography>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					sx={{
						textTransform: "none",
						borderRadius: 2,
						px: 3,
					}}
				>
					Nova categoria
				</Button>
			</Box>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						sm: "repeat(2, 1fr)",
						md: "repeat(3, 1fr)",
					},
					gap: 2,
				}}
			>
				{categories.map((category) => (
					<Card
						key={category.id}
						elevation={0}
						sx={{
							border: 1,
							borderColor: "divider",
							transition: "all 0.2s",
							"&:hover": {
								borderColor: "#3b82f6",
								boxShadow: `0 4px 12px #3b82f6 20`,
							},
						}}
					>
						<CardContent>
							<Box
								sx={{
									display: "flex",
									alignItems: "flex-start",
									justifyContent: "space-between",
									mb: 2,
								}}
							>
								<Box
									sx={{
										width: 40,
										height: 40,
										borderRadius: 2,
										bgcolor: `#3b82f615`,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<CategoryIcon sx={{ color: "#3b82f6", fontSize: 20 }} />
								</Box>
								<Box sx={{ display: "flex", gap: 0.5 }}>
									<IconButton size="small" sx={{ color: "text.secondary" }}>
										<EditIcon fontSize="small" />
									</IconButton>
									<IconButton size="small" sx={{ color: "error.main" }}>
										<DeleteIcon fontSize="small" />
									</IconButton>
								</Box>
							</Box>
							<Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
								{category.name}
							</Typography>
							<Chip
								label={`0 despesas`}
								size="small"
								sx={{
									bgcolor: `#3b82f615`,
									color: "#3b82f6",
									fontWeight: 500,
								}}
							/>
						</CardContent>
					</Card>
				))}
			</Box>
		</Box>
	);
}