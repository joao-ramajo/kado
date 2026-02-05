import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { Source } from "../hooks/useGetSourceListQuery";

type SourcesSelectProps = {
	value: number | null;
	onChange: (value: number | null) => void;
	sources: Source[];
	disabled?: boolean;
};

export const SourcesSelect = ({
	value,
	onChange,
	sources,
	disabled = false,
}: SourcesSelectProps) => {
	const labelId = "source-label";

	return (
		<FormControl fullWidth disabled={disabled}>
			<InputLabel id={labelId}>Fonte</InputLabel>
			<Select<number | "">
				labelId={labelId}
				label="Fonte"
				value={value ?? ""}
				onChange={(e) => {
					const v = e.target.value;
					onChange(v === "" ? null : Number(v));
				}}
			>
				{sources.map((source) => (
					<MenuItem key={source.id} value={source.id}>
						{source.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
