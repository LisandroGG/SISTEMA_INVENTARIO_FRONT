import {
	Archive,
	ArrowLeftRight,
	Bell,
	LayoutDashboard,
	Menu,
	Shapes,
	ShoppingCart,
	X,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
	const [isOpen, setIsOpen] = useState(false);

	const navItems = [
		{
			path: "/",
			title: "Panel de control",
			icon: <LayoutDashboard size={20} />,
		},
		{ path: "/products", title: "Productos", icon: <Archive size={20} /> },
		{ path: "/categories", title: "Categorías", icon: <Shapes size={20} /> },
		{
			path: "/movements",
			title: "Movimientos",
			icon: <ArrowLeftRight size={20} />,
		},
		{ path: "/sales", title: "Ventas", icon: <ShoppingCart size={20} /> },
		{
			path: "/notifications",
			title: "Notificaciones",
			icon: <Bell size={20} />,
		},
	];

	return (
		<>
			<div className="lg:hidden top-0 z-50 bg-secondary shadow-md relative">
				<div className="h-16 px-4 flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-black tracking-tight text-white">
							Stock
							<span className="text-primary">{"<tify />"}</span>
						</h1>
					</div>

					<div className="pr-3">
						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							className="
							text-white
							bg-white/10
							hover:bg-white/20
							transition-colors
							p-2
							rounded-md
						"
						>
							{isOpen ? <X size={20} /> : <Menu size={20} />}
						</button>
					</div>
				</div>

				{isOpen && (
					<button
						type="button"
						aria-label="Cerrar menú"
						className="
			fixed top-16 left-0 right-0 bottom-0
			bg-black/20
			backdrop-blur-sm
			z-40
		"
						onClick={() => setIsOpen(false)}
					/>
				)}

				<div
					className={`
						absolute top-full left-0 w-full z-50
						overflow-hidden
						transition-all duration-300
						bg-secondary backdrop-blur-sm
						border-t border-white/10
						shadow-xl

						${isOpen ? "max-h-96 " : "max-h-0"}
					`}
				>
					<nav className="py-2">
						<ul className="flex flex-col gap-1">
							{navItems.map((item) => (
								<li key={item.title}>
									<NavLink
										to={item.path}
										onClick={() => setIsOpen(false)}
										className={({ isActive }) =>
											`
												relative flex items-center gap-3
												px-4 py-3
												font-semibold
												transition-colors

												${
													isActive
														? "bg-white/10 text-white"
														: "text-neutral-300 hover:bg-white/5 hover:text-white"
												}
											`
										}
									>
										{({ isActive }) => (
											<>
												{isActive && (
													<span className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full" />
												)}

												<span className={isActive ? "text-primary" : ""}>
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
			</div>

			<header
				className={`
                hidden lg:flex flex-col bg-secondary h-full min-h-screen w-64 z-40
                transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
			>
				<div className="h-30 px-6 flex flex-col justify-center">
					<h1 className="text-3xl font-black tracking-tight text-white">
						Stock
						<span className="text-primary">{"<tify />"}</span>
					</h1>
					<p className="text-xs text-neutral/60 tracking-widest uppercase mt-1">
						Gestión de inventario
					</p>
				</div>
				<nav>
					<ul className="flex flex-col gap-1">
						{navItems.map((item) => (
							<li key={item.title}>
								<NavLink
									to={item.path}
									onClick={() => setIsOpen(false)}
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
												className={`transition-colors ${isActive ? "text-primary" : "group-hover:text-primary"}`}
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
			</header>
		</>
	);
};

export default Nav;
