import Nav from "@components/Nav/Nav";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className="flex">
			<aside>
				<Nav />
			</aside>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
