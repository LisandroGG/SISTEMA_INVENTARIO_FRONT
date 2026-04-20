type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
	label?: string;
	options: { value: string; label: string }[];
};

const Select = ({ label, options, id, ...rest }: SelectProps) => {
	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label htmlFor={id} className="text-md font-medium">
					{label}
				</label>
			)}
			<select
				id={id}
				{...rest}
				className="border rounded-sm p-1 bg-white transition-all font-medium"
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
