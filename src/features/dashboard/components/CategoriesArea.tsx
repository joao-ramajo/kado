// CategoriesArea.tsx
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Typography,
} from "@mui/material";
import { formatCurrency } from "../../../utils/formatCurrency";
import { useCategoryModalContext } from "../context/CategoryModalContextProvider";
import { useGetCategoryListQuery } from "../hooks/useGetCategoryListQuery";

export function CategoriesArea() {
	const { selectAction } = useCategoryModalContext();

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
					onClick={() => selectAction("create")}
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
								borderColor: category.color,
								boxShadow: `0 4px 12px ${category.color}20`,
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
										bgcolor: `${category.color}15`,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<CategoryIcon sx={{ color: category.color, fontSize: 20 }} />
								</Box>
								<Box sx={{ display: "flex", gap: 0.5 }}>
									{/* <IconButton size="small" sx={{ color: "text.secondary" }}>
										<EditIcon fontSize="small" />
									</IconButton>
									<IconButton size="small" sx={{ color: "error.main" }}>
										<DeleteIcon fontSize="small" />
									</IconButton> */}
								</Box>
							</Box>
							<Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
								{category.name}
							</Typography>
							<Chip
								label={`${category.expenses_count} despesas`}
								size="small"
								sx={{
									bgcolor: `${category.color}15`,
									color: category.color,
									fontWeight: 500,
								}}
							/>
							<CardContent sx={{ pb: 1 }}>
								{category.expenses_total_amount && (
									<Box
										sx={{
											mt: 2,
											pt: 2,
											borderTop: 1,
											borderColor: "divider",
										}}
									>
										<Typography variant="caption" color="text.secondary">
											Total gasto
										</Typography>
										<Typography
											variant="h6"
											sx={{ fontWeight: 700, color: category.color }}
										>
											{formatCurrency(category.expenses_total_amount)}
										</Typography>
									</Box>
								)}
							</CardContent>
						</CardContent>
					</Card>
				))}
			</Box>
		</Box>
	);
}
