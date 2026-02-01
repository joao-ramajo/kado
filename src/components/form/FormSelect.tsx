import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type OptionWithId = {
	id: string | number;
};

type FormSelectProps<T extends OptionWithId> = {
	label: string;
	value: string;
	onChange: (value: string) => void;
	options: T[];
	getLabel: (item: T) => string;
	disabled?: boolean;
	emptyLabel?: string;
};

export const FormSelect = <T extends OptionWithId>({
	label,
	value,
	onChange,
	options,
	getLabel,
	disabled = false,
	emptyLabel = "Selecione",
}: FormSelectProps<T>) => {
	const labelId = `${label}-label`;

	return (
		<FormControl fullWidth disabled={disabled}>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select
				labelId={labelId}
				label={label}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			>
				<MenuItem value="">{emptyLabel}</MenuItem>

				{options.map((item) => (
					<MenuItem key={item.id} value={item.id.toString()}>
						{getLabel(item)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
