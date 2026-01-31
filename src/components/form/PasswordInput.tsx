// src/components/PasswordInput.tsx

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type PasswordInputProps<T extends FieldValues> = {
	label: string;
	name: Path<T>;
	register: UseFormRegister<T>;
	error?: string;
};

export function PasswordInput<T extends FieldValues>({
	label,
	name,
	register,
	error,
}: PasswordInputProps<T>) {
	const [visible, setVisible] = useState(false);

	return (
		<TextField
			label={label}
			type={visible ? "text" : "password"}
			{...register(name)}
			error={!!error}
			helperText={error}
			fullWidth
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => setVisible((v) => !v)}
							edge="end"
						>
							{visible ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
}
