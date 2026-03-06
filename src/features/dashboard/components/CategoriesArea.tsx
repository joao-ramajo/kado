// CategoriesArea.tsx
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { type MouseEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";
import { useCategoryModalContext } from "../context/CategoryModalContextProvider";
import {
	type Category,
	useGetCategoryListQuery,
} from "../hooks/useGetCategoryListQuery";
import { CategoryExpensesModal } from "./CategoryExpensesModal";

const MONTHS = [
	{ value: 1, label: "Janeiro" },
	{ value: 2, label: "Fevereiro" },
	{ value: 3, label: "Março" },
	{ value: 4, label: "Abril" },
	{ value: 5, label: "Maio" },
	{ value: 6, label: "Junho" },
	{ value: 7, label: "Julho" },
	{ value: 8, label: "Agosto" },
	{ value: 9, label: "Setembro" },
	{ value: 10, label: "Outubro" },
	{ value: 11, label: "Novembro" },
	{ value: 12, label: "Dezembro" },
];

export function CategoriesArea() {
	const { selectAction } = useCategoryModalContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null,
	);

	const monthFromQuery = searchParams.get("category_month");
	const parsedMonth = monthFromQuery ? Number(monthFromQuery) : undefined;
	const selectedMonth =
		parsedMonth && parsedMonth >= 1 && parsedMonth <= 12
			? parsedMonth
			: undefined;

	const { data } = useGetCategoryListQuery(selectedMonth);

	const categories = data ?? [];

	const handleMonthChange = (month: number | "") => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);

			if (month === "") {
				params.delete("category_month");
				return params;
			}

			params.set("category_month", String(month));
			return params;
		});
	};

	const handleOpenCategoryDetails = (category: Category) => {
		setSelectedCategory(category);
	};

	const handleEditCategory = (
		event: MouseEvent<HTMLButtonElement>,
		category: Category,
	) => {
		event.stopPropagation();
		selectAction("edit", category);
	};

	const handleCloseCategoryDetails = () => {
		setSelectedCategory(null);
	};

	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: { xs: "stretch", sm: "center" },
					flexDirection: { xs: "column", sm: "row" },
					mb: 3,
					gap: 2,
				}}
			>
				<Typography variant="h5" sx={{ fontWeight: 600 }}>
					Gerenciar Categorias
				</Typography>
				<Box
					sx={{ display: "flex", gap: 2, width: { xs: "100%", sm: "auto" } }}
				>
					<FormControl size="small" sx={{ minWidth: 180 }}>
						<InputLabel id="category-month-filter-label">
							Filtrar por mês
						</InputLabel>
						<Select
							labelId="category-month-filter-label"
							label="Filtrar por mês"
							value={selectedMonth ?? ""}
							onChange={(event) => {
								const rawValue = String(event.target.value);
								handleMonthChange(rawValue === "" ? "" : Number(rawValue));
							}}
						>
							<MenuItem value="">Todos os meses</MenuItem>
							{MONTHS.map((month) => (
								<MenuItem key={month.value} value={month.value}>
									{month.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>

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
						onClick={() => handleOpenCategoryDetails(category)}
						sx={{
							border: 1,
							borderColor: "divider",
							transition: "all 0.2s",
							cursor: "pointer",
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
									<IconButton
										size="small"
										sx={{ color: "text.secondary" }}
										onClick={(event) => handleEditCategory(event, category)}
									>
										<EditIcon fontSize="small" />
									</IconButton>
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
			<CategoryExpensesModal
				open={!!selectedCategory}
				onClose={handleCloseCategoryDetails}
				category={selectedCategory}
				month={selectedMonth}
			/>
		</Box>
	);
}
