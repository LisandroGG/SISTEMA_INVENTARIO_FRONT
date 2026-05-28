import type { RecentSale } from "@redux/features/stats/statsType";
import DashboardCard from "./DashboardCard";

type RecentSalesProps = {
	sales?: RecentSale[];
};

const RecentSales = ({ sales = [] }: RecentSalesProps) => {
	return (
		<DashboardCard title="Ventas recientes">
			<div className="min-h-70 flex flex-col gap-3">
				{sales.length ? (
					sales.map((sale) => (
						<div
							key={sale.id}
							className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-3"
						>
							<div>
								<p className="font-medium text-neutral-800">
									{sale.clientName}
								</p>

								<div className="flex gap-2 text-sm text-neutral-500">
									<p>{sale.items.length} productos</p>

									<p>
										{sale.createdAt
											? new Date(sale.createdAt).toLocaleString("es-AR", {
													day: "2-digit",
													month: "2-digit",
													year: "numeric",
													hour: "2-digit",
													minute: "2-digit",
													hour12: false,
												})
											: null}
									</p>
								</div>
							</div>

							<div className="text-right">
								<p className="font-semibold text-neutral-800">
									${sale.total.toLocaleString("es-AR")}
								</p>

								<p
									className={`text-sm ${
										sale.status === "completed"
											? "text-primary"
											: "text-red-500"
									}`}
								>
									{sale.status === "completed" ? "Completada" : "Cancelada"}
								</p>
							</div>
						</div>
					))
				) : (
					<div className="flex-1 grid place-content-center">
						<p className="text-sm text-neutral-400">Sin ventas recientes</p>
					</div>
				)}
			</div>
		</DashboardCard>
	);
};

export default RecentSales;
