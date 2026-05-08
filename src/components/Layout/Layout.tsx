import Nav from "@components/Nav/Nav";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className="flex flex-col lg:flex-row min-h-screen">
			<aside>
				<Nav />
			</aside>
			<div className="flex flex-col flex-1">
				<main className="flex-1">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Layout;
