import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SelectOption = { value: string; label: string };

type SelectProps = {
	options: SelectOption[];
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	label?: string;
};

const Select = ({
	options,
	value,
	onChange,
	placeholder = "Seleccionar...",
	label,
}: SelectProps) => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const selected = options.find((o) => o.value === value);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="flex flex-col gap-1">
			{label && <span className="text-md font-medium">{label}</span>}
			<div ref={ref} className="relative min-w-48">
				<button
					type="button"
					onClick={() => setOpen(!open)}
					className="flex items-center justify-between gap-2 w-full border border-neutral-300 rounded-md px-3 py-2 bg-white text-sm cursor-pointer hover:border-neutral-400 transition-colors"
				>
					<span className={selected ? "text-neutral-800" : "text-neutral-400"}>
						{selected ? selected.label : placeholder}
					</span>
					<ChevronDown
						size={14}
						className={`transition-transform ${open ? "rotate-180" : ""}`}
					/>
				</button>

				{open && (
					<div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-md shadow-md overflow-hidden">
						{options.map((option) => (
							<button
								type="button"
								key={option.value}
								onClick={() => {
									onChange(option.value);
									setOpen(false);
								}}
								className={`w-full text-left px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 transition-colors ${value === option.value ? "bg-neutral-100 font-medium" : ""}`}
							>
								{option.label}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Select;
