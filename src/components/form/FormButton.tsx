import { Button, type ButtonProps, CircularProgress } from "@mui/material";

type FormButtonProps = {
	isLoading: boolean;
} & ButtonProps;

export function FormButton({ isLoading, children, ...props }: FormButtonProps) {
	return (
		<Button disabled={isLoading} {...props}>
			{isLoading ? <CircularProgress size={20} /> : children}
		</Button>
	);
}
