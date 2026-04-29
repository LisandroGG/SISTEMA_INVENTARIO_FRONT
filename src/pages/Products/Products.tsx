import Button from "@components/Common/Button";
import Loading from "@components/Common/Loading";
import Pagination from "@components/Common/Pagination.jsx";
import SearchInput from "@components/Common/SearchInput";
import Section from "@components/Common/Section";
import Select from "@components/Common/Select";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import usePagination from "@hooks/usePagination.js";
import { getAllCategories } from "@redux/features/category/categoryThunks";
import { getAllProducts } from "@redux/features/products/productThunks";
import type { AppDispatch, RootState } from "@redux/store";
import { SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const Products = () => {
	const { products } = useSelector((state: RootState) => state.products);
	const { categories } = useSelector((state: RootState) => state.categories);
	const { run } = useCrudDispatch();
	const dispatch = useDispatch<AppDispatch>();

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		dispatch(getAllCategories());
	}, []);

	const {
		page,
		totalPages,
		hasNext,
		hasPrev,
		loading,
		goToPage,
		applyFilters,
		clearFilters,
		filters,
	} = usePagination((state) => state.products, getAllProducts);

	const hasActiveFilters = Object.keys(filters || {}).length > 0;

	const [nameValue, setNameValue] = useState("");
	const [categoryValue, setCategoryValue] = useState("");

	const handleNameSearch = () => {
		applyFilters({
			...(nameValue && { name: nameValue }),
			...(categoryValue && { categoryId: categoryValue }),
		});
	};

	const handleCategoryChange = (value: string) => {
		setCategoryValue(value);
		applyFilters({
			...(nameValue && { name: nameValue }),
			...(value && { categoryId: value }),
		});
	};

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando presupuestos..."} />
			</div>
		);
	}

	return (
		<Section>
			<div className="flex justify-between items-center">
				<div className="flex gap-2">
					<SearchInput
						type="text"
						placeholder="Buscar producto..."
						value={nameValue}
						onChange={(e) => setNameValue(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleNameSearch()}
					/>
					<Select
						value={categoryValue}
						onChange={(val) => handleCategoryChange(val)}
						options={[
							{ value: "", label: "Todas las categorías" },
							...categories.map((c) => ({
								value: String(c.id),
								label: c.name,
							})),
						]}
					></Select>
				</div>
				<Button className="flex items-center gap-2">
					<SquarePlus size={20} />
					Nuevo producto
				</Button>
			</div>
			<div className="grid grid-cols-4 gap-4">
				{products.map((p) => (
					<ProductCard key={p.id} product={p} />
				))}
			</div>
			<Pagination
				page={page}
				totalPages={totalPages}
				hasPrev={hasPrev}
				hasNext={hasNext}
				onPageChange={goToPage}
			/>
		</Section>
	);
};

export default Products;
