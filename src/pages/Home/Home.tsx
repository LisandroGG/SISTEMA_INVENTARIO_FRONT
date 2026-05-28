import Loading from "@components/Common/Loading";
import Section from "@components/Common/Section";
import { getDashboardStats } from "@redux/features/stats/statsThunks";
import type { AppDispatch, RootState } from "@redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardCards from "./DashboardCards";
import LowStockProducts from "./LowStockProducts";
import RecentMovements from "./RecentMovements";
import RecentSales from "./RecentSales";

const Home = () => {
	const { stats, loading } = useSelector((state: RootState) => state.stats);

	const dispatch = useDispatch<AppDispatch>();

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		dispatch(getDashboardStats());
	}, []);

	if (loading || !stats) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText="Cargando estadísticas..." />
			</div>
		);
	}

	return (
		<Section>
			<div className="flex flex-col min-h-[93vh] animate-fadeInToBottom">
				<div className="flex flex-col gap-4">
					<DashboardCards stats={stats} />

					<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
						<RecentSales sales={stats.recentSales} />

						<RecentMovements movements={stats.recentMovements} />

						<LowStockProducts products={stats.lowStockProducts} />
					</div>
				</div>
			</div>
		</Section>
	);
};

export default Home;
