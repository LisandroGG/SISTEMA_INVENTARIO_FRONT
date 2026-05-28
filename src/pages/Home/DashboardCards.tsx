import type { Stats } from "@redux/features/stats/statsType";

type DashboardCardsProps = {
	stats: Stats;
};

const DashboardCards = ({ stats }: DashboardCardsProps) => {
	const cards = [
		{
			title: "Productos",
			value: stats.totalProducts,
		},
		{
			title: "Categorías",
			value: stats.totalCategories,
		},
		{
			title: "Ventas del mes",
			value: stats.monthlySalesCount,
		},
		{
			title: "Ingresos del mes",
			value: `$${stats.totalMonthlyRevenue.toLocaleString("es-AR")}`,
		},
	];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
			{cards.map((card) => (
				<div
					key={card.title}
					className="rounded-lg border border-neutral-200 bg-white shadow-md p-5"
				>
					<p className="text-sm text-neutral-500">{card.title}</p>

					<h2 className="text-3xl font-bold text-neutral-800 mt-1">
						{card.value}
					</h2>
				</div>
			))}
		</div>
	);
};

export default DashboardCards;
