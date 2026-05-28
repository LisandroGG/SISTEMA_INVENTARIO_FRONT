import type { LowStockProduct } from "@redux/features/stats/statsType";
import DashboardCard from "./DashboardCard";

type LowStockProductsProps = {
	products?: LowStockProduct[];
};

const LowStockProducts = ({ products = [] }: LowStockProductsProps) => {
	return (
		<DashboardCard title="Productos con poco stock" className="xl:col-span-2">
			<div className="min-h-39 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-3">
				{products.length ? (
					products.map((product) => (
						<div
							key={product.id}
							className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-3"
						>
							<div>
								<p className="font-medium text-neutral-800">
									{product.product.name}
								</p>

								<p className="text-sm text-neutral-500">
									Mínimo: {product.minQuantity}
								</p>
							</div>

							<span className="font-semibold text-tertiary">
								{product.quantity} restantes
							</span>
						</div>
					))
				) : (
					<div className="md:col-span-2 grid place-content-center">
						<p className="text-sm text-neutral-400">
							Sin productos con stock bajo
						</p>
					</div>
				)}
			</div>
		</DashboardCard>
	);
};

export default LowStockProducts;
