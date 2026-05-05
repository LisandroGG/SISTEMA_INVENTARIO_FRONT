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
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { path: "/", title: "Panel de control", icon: <LayoutDashboard size={20} /> },
        { path: "/products", title: "Productos", icon: <Archive size={20} /> },
        { path: "/categories", title: "Categorías", icon: <Shapes size={20} /> },
        { path: "/movements", title: "Movimientos", icon: <ArrowLeftRight size={20} /> },
        { path: "/sales", title: "Ventas", icon: <ShoppingCart size={20} /> },
        { path: "/notifications", title: "Notificaciones", icon: <Bell size={20} /> },
    ];

    return (
        <>
            <button
                type="button"
                className="lg:hidden fixed top-4 left-4 z-50 bg-secondary text-white p-2 rounded-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {isOpen && (
                <button
                    type="button"
                    className="lg:hidden fixed inset-0 z-30 bg-black/40"
                    onClick={() => setIsOpen(false)}
                    aria-label="Cerrar menú"
                />
            )}

            <header className={`
                bg-secondary h-full min-h-screen w-64 fixed lg:static z-40
                transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>
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
                                            <span className={`transition-colors ${isActive ? "text-primary" : "group-hover:text-primary"}`}>
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
