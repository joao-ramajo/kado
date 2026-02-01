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
import React, { useState } from "react";
import toast from "react-hot-toast";
import type { LaravelValidationError } from "../../../api/instance";
import { useCraeteCategoryMutation } from "../hooks/useCreateCategoryMutation";

type CreateCategoryModalProps = {
	open: boolean;
	onClose: () => void;
};

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children: React.ReactElement },
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const PRESET_COLORS = [
	"#ef4444", // red
	"#f59e0b", // orange
	"#eab308", // yellow
	"#10b981", // green
	"#06b6d4", // cyan
	"#3b82f6", // blue
	"#8b5cf6", // purple
	"#ec4899", // pink
	"#64748b", // slate
	"#78716c", // stone
];

export function CreateCategoryModal({
	open,
	onClose,
}: CreateCategoryModalProps) {
	const [name, setName] = useState("");
	const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

	const { mutateAsync } = useCraeteCategoryMutation();
	const queryClient = useQueryClient();
	function handleClose() {
		setName("");
		setSelectedColor(PRESET_COLORS[0]);
		onClose();
	}

	function handleSubmit(e: React.SubmitEvent) {
		e.preventDefault();
		mutateAsync(
			{ name: name, color: selectedColor },
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

					if (apiError?.message && status === 400) {
						toast.error(apiError.message);
					} else {
						toast.error("Erro inesperado");
					}
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
						Nova categoria
					</Typography>
					<IconButton onClick={handleClose} size="small">
						<Close />
					</IconButton>
				</DialogTitle>

				<DialogContent
					sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}
				>
					{/* Nome da categoria */}
					<Box />
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

					{/* Seletor de cor */}
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

						{/* Preview da categoria */}
						<Box
							sx={{
								mt: 3,
								p: 2,
								border: 1,
								borderColor: "divider",
								borderRadius: 2,
								bgcolor: "action.hover",
							}}
						>
							<Typography
								variant="caption"
								sx={{ color: "text.secondary", display: "block", mb: 1 }}
							>
								Preview:
							</Typography>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
								<Box
									sx={{
										width: 32,
										height: 32,
										borderRadius: 1.5,
										bgcolor: `${selectedColor}20`,
										border: `2px solid ${selectedColor}`,
										flexShrink: 0,
									}}
								/>
								<Typography
									sx={{
										fontWeight: 600,
										color: name ? "text.primary" : "text.disabled",
									}}
								>
									{name || "Nome da categoria"}
								</Typography>
							</Box>
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
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={!name.trim()}
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
						Criar categoria
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
