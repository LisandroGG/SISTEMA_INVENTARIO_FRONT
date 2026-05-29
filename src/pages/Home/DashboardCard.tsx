import type { ReactNode } from "react";

type DashboardCardProps = {
	title: string;
	children: ReactNode;
	className?: string;
};

const DashboardCard = ({
	title,
	children,
	className = "",
}: DashboardCardProps) => {
	return (
		<div
			className={`rounded-lg border-l-3 border-l-primary border border-neutral-200 bg-white shadow-md p-5 ${className}`}
		>
			<h3 className="text-lg font-semibold text-neutral-800 mb-3">{title}</h3>

			{children}
		</div>
	);
};

export default DashboardCard;
