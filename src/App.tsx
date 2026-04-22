import Layout from "@components/Layout/Layout";
import Categories from "@pages/Categories/Categories";
import Home from "@pages/Home/Home";
import Movements from "@pages/Movements/Movements";
import Notifications from "@pages/Notifications/Notifications";
import Products from "@pages/Products/Products";
import Sales from "@pages/Sales/Sales";
import { Toaster } from "react-hot-toast";
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="min-h-screen bg-neutral">
			<Toaster position="top-center" />

			<HashRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="products" element={<Products />} />
						<Route path="categories" element={<Categories />} />
						<Route path="movements" element={<Movements />} />
						<Route path="sales" element={<Sales />} />
						<Route path="notifications" element={<Notifications />} />
					</Route>
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
