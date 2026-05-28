import type { RecentMovement } from "@redux/features/stats/statsType";
import DashboardCard from "./DashboardCard";

type RecentMovementsProps = {
	movements?: RecentMovement[];
};

const RecentMovements = ({ movements = [] }: RecentMovementsProps) => {
	return (
		<DashboardCard title="Movimientos recientes">
			<div className="min-h-70 flex flex-col gap-3">
				{movements.length ? (
					movements.map((movement) => (
						<div
							key={movement.id}
							className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-3"
						>
							<div>
								<p className="font-medium text-neutral-800">
									{movement.product.name}
								</p>

								<p className="text-sm text-neutral-500">{movement.reason}</p>
							</div>

							<div className="text-right">
								<p
									className={`font-semibold ${
										movement.type === "IN" ? "text-primary" : "text-red-500"
									}`}
								>
									{movement.type === "IN" ? "+" : "-"}
									{movement.quantity}
								</p>

								<p className="text-sm text-neutral-500">
									{movement.type === "IN" ? "Entrada" : "Salida"}
								</p>
							</div>
						</div>
					))
				) : (
					<div className="flex-1 grid place-content-center">
						<p className="text-sm text-neutral-400">
							Sin movimientos recientes
						</p>
					</div>
				)}
			</div>
		</DashboardCard>
	);
};

export default RecentMovements;
