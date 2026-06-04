import type { LowStockProduct } from "@redux/features/stats/statsType";
import DashboardCard from "./DashboardCard";

type LowStockProductsProps = {
	products?: LowStockProduct[];
};

const LowStockProducts = ({ products = [] }: LowStockProductsProps) => {
	return (
		<DashboardCard
			title="Productos con poco stock"
			className="xl:col-span-2 border-t-tertiary"
		>
			<div className="h-60 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-min">
				{products.length ? (
					products.map((product) => (
						<div
							key={product.id}
							className="flex h-18 items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-3"
						>
							<div className="flex-1">
								<p className="font-medium text-neutral-800">
									{product.product.name}
								</p>

								<p className="text-sm text-neutral-500">
									Mínimo: {product.minQuantity}
								</p>

								<div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200">
									<div
										className={`h-full transition-all ${
											product.quantity <= 0 ? "" : "bg-tertiary"
										}`}
										style={{
											width: `${Math.min(
												(product.quantity / product.minQuantity) * 100,
												100,
											)}%`,
										}}
									/>
								</div>
							</div>

							<span className="ml-4 font-semibold text-tertiary w-40 text-center">
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
