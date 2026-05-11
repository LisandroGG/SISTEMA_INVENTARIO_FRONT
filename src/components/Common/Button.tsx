type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	text?: string;
	variant?: "primary" | "secondary" | "danger" | "ghost";
};

const Button = ({
	text,
	children,
	variant = "primary",
	className,
	...rest
}: ButtonProps) => {
	const base =
		"px-4 py-1.5 font-semibold transition-all cursor-pointer hover:scale-105 rounded-md shadow-md outline-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

	const variants = {
		primary: "bg-primary text-white hover:opacity-90",
		secondary: "bg-neutral text-secondary hover:opacity-90",
		danger: "bg-secondary/80 text-white hover:opacity-90",
		ghost:
			"bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-white",
	};

	return (
		<button {...rest} className={`${base} ${variants[variant]} ${className}`}>
			{text || children}
		</button>
	);
};

export default Button;
