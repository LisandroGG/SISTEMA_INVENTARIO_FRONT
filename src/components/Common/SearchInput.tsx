import { Search } from "lucide-react";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput = ({ ...rest }: SearchInputProps) => {
	return (
		<div className="flex items-center gap-2 border border-neutral-300 rounded-md px-3 py-2 bg-white hover:border-neutral-400 transition-colors ">
			<Search size={14} className="text-neutral-400" />
			<input
				{...rest}
				className="outline-none bg-transparent text-sm w-full text-neutral-800 placeholder:text-neutral-400"
			/>
		</div>
	);
};

export default SearchInput;
