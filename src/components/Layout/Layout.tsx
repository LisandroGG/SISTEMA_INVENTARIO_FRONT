import Nav from "@components/Nav/Nav";
import { Outlet, useLocation } from "react-router-dom";

const routeTitles: Record<string, string> = {
	"/": "Inicio",
	"/products": "Productos",
	"/stock": "Stock",
	"/sales": "Ventas",
	"/notifications": "Notificaciones",
	"/movements": "Movimientos",
};

const Layout = () => {
	const location = useLocation();
	const title = routeTitles[location.pathname] || "Inicio";

	return (
		<div className="flex min-h-screen">
			<aside>
				<Nav />
			</aside>
			<div className="flex flex-col flex-1">
				<header className="flex items-center justify-between px-6 py-3 border-b border-neutral-200 bg-white">
					<span className="font-semibold text-lg">{title}</span>
				</header>
				<main className="flex-1 p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Layout;
