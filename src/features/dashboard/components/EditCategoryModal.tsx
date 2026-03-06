import { Close } from "@mui/icons-material";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Slide,
	TextField,
	Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { LaravelValidationError } from "../../../api/instance";
import type { Category } from "../hooks/useGetCategoryListQuery";
import { useUpdateCategoryMutation } from "../hooks/useUpdateCategoryMutation";

type EditCategoryModalProps = {
	open: boolean;
	onClose: () => void;
	category?: Category;
};

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children: React.ReactElement },
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const PRESET_COLORS = [
	"#ef4444",
	"#f59e0b",
	"#eab308",
	"#10b981",
	"#06b6d4",
	"#3b82f6",
	"#8b5cf6",
	"#ec4899",
	"#64748b",
	"#78716c",
];

export function EditCategoryModal({
	open,
	onClose,
	category,
}: EditCategoryModalProps) {
	const [name, setName] = useState("");
	const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

	const { mutateAsync, isPending: isLoading } = useUpdateCategoryMutation();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!category) return;

		setName(category.name);
		setSelectedColor(category.color);
	}, [category]);

	function handleClose() {
		onClose();
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!category) return;

		mutateAsync(
			{
				id: category.id,
				name: name.trim(),
				color: selectedColor,
			},
			{
				onSuccess: (response) => {
					toast.success(response.message);
					queryClient.invalidateQueries({
						queryKey: ["dashboard-categories"],
					});
					handleClose();
				},
				onError: (error: AxiosError<LaravelValidationError>) => {
					const status = error.response?.status;
					const apiError = error.response?.data;

					if (status === 422 && apiError?.errors) {
						const firstError = Object.values(apiError.errors)[0]?.[0];
						toast.error(firstError ?? "Erro de validação");
						return;
					}

					if (apiError?.message && status === 400) {
						toast.error(apiError.message);
						return;
					}

					toast.error("Erro inesperado");
				},
			},
		);
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth
			maxWidth="sm"
			TransitionComponent={Transition}
			PaperProps={{
				sx: {
					borderRadius: 2,
				},
			}}
		>
			<form onSubmit={handleSubmit}>
				<DialogTitle
					sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
				>
					<Typography fontWeight={700} variant="h6">
						Editar categoria
					</Typography>
					<IconButton onClick={handleClose} size="small">
						<Close />
					</IconButton>
				</DialogTitle>

				<DialogContent
					sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}
				>
					<TextField
						label="Nome da categoria"
						placeholder="Ex: Alimentação, Transporte..."
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						fullWidth
						autoFocus
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: 2,
							},
						}}
					/>

					<Box>
						<Typography
							variant="body2"
							sx={{
								mb: 1.5,
								fontWeight: 500,
								color: "text.secondary",
							}}
						>
							Escolha uma cor
						</Typography>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(5, 1fr)",
								gap: 1.5,
							}}
						>
							{PRESET_COLORS.map((color) => (
								<Box
									key={color}
									onClick={() => setSelectedColor(color)}
									sx={{
										width: "100%",
										aspectRatio: "1",
										bgcolor: color,
										borderRadius: 2,
										cursor: "pointer",
										border: 3,
										borderColor:
											selectedColor === color
												? "background.paper"
												: "transparent",
										outline:
											selectedColor === color ? `2px solid ${color}` : "none",
										outlineOffset: 2,
										transition: "all 0.2s ease-in-out",
										"&:hover": {
											transform: "scale(1.1)",
											boxShadow: `0 4px 12px ${color}60`,
										},
									}}
								/>
							))}
						</Box>
					</Box>
				</DialogContent>

				<DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
					<Button
						onClick={handleClose}
						sx={{
							textTransform: "none",
							borderRadius: 2,
							px: 3,
						}}
						disabled={isLoading}
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={!name.trim()}
						loading={isLoading}
						sx={{
							textTransform: "none",
							borderRadius: 2,
							px: 3,
							bgcolor: selectedColor,
							"&:hover": {
								bgcolor: selectedColor,
								filter: "brightness(0.9)",
							},
						}}
					>
						Salvar alterações
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
