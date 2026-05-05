import clsx from "clsx";

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
		"px-6 py-2 font-semibold transition-all cursor-pointer hover:scale-105 rounded-md shadow-md";

	const variants = {
		primary: "bg-primary text-white hover:opacity-90",
		secondary: "bg-neutral text-secondary hover:opacity-90",
		danger: "bg-secondary/80 text-white hover:opacity-90",
		ghost:
			"bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-white",
	};

	return (
		<button {...rest} className={clsx(base, variants[variant], className)}>
			{text || children}
		</button>
	);
};

export default Button;
