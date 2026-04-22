import {
	Archive,
	ArrowLeftRight,
	Bell,
	LayoutDashboard,
	Shapes,
	ShoppingCart,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Nav = () => {
	const navItems = [
		{
			path: "/",
			title: "Panel de control",
			icon: <LayoutDashboard size={20} />,
		},
		{
			path: "/products",
			title: "Productos",
			icon: <Archive size={20} />,
		},
		{
			path: "/categories",
			title: "Categorías",
			icon: <Shapes size={20} />,
		},
		{
			path: "/movements",
			title: "Movimientos",
			icon: <ArrowLeftRight size={20} />,
		},
		{
			path: "/sales",
			title: "Ventas",
			icon: <ShoppingCart size={20} />,
		},
		{
			path: "/notifications",
			title: "Notificaciones",
			icon: <Bell size={20} />,
		},
	];
	return (
		<header className="bg-secondary h-full min-h-screen w-64">
			<div className="h-30 px-6 flex flex-col justify-center">
				<h1 className="text-3xl font-black tracking-tight text-white">
					Stock
					<span className="text-primary">{"<tify />"}</span>
				</h1>

				<p className="text-xs text-neutral/60 tracking-widest uppercase mt-1">
					Inventory Management
				</p>
			</div>
			<div className="w-full">
				<nav>
					<ul className="flex flex-col gap-1">
						{navItems.map((item) => (
							<li key={item.title}>
								<NavLink
									to={item.path}
									className={({ isActive }) =>
										`relative group flex gap-2 items-center py-3 pl-6 font-semibold transition-colors ${isActive ? "bg-neutral/10 text-white" : "text-white hover:bg-neutral/10"}`
									}
								>
									{({ isActive }) => (
										<>
											{isActive && (
												<span className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full" />
											)}
											<span
												className={`transitions-colors ${isActive ? "text-primary" : "group-hover:text-primary"}`}
											>
												{item.icon}
											</span>
											<span>{item.title}</span>
										</>
									)}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Nav;
