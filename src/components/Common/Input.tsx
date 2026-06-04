type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
};

const Input = ({ label, id, className, ...rest }: InputProps) => {
	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label htmlFor={id} className="text-md font-medium">
					{label}
				</label>
			)}
			<input
				id={id}
				{...rest}
				className={`border rounded-sm p-1 bg-white transition-all font-medium outline-none focus:border-secondary focus:border-2 ${className}`}
			/>
		</div>
	);
};

export default Input;
