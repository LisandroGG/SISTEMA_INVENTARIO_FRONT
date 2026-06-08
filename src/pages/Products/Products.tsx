import Button from "@components/Common/Button";
import ConfirmModal from "@components/Common/ConfirmModal";
import Loading from "@components/Common/Loading";
import Pagination from "@components/Common/Pagination.jsx";
import SearchInput from "@components/Common/SearchInput";
import Section from "@components/Common/Section";
import Select from "@components/Common/Select";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import useModalState from "@hooks/useModalState";
import usePagination from "@hooks/usePagination.js";
import { getAllCategoriesNoPagination } from "@redux/features/category/categoryThunks";
import {
	deleteProduct,
	getAllProducts,
} from "@redux/features/products/productThunks";
import type { Product } from "@redux/features/products/productTypes";
import type { AppDispatch, RootState } from "@redux/store";
import { SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdjustStockModal from "./modals/AdjustStockModal";
import CreateProductModal from "./modals/CreateProductModal";
import EditProductModal from "./modals/EditProductModal";
import ProductCard from "./ProductCard";

const Products = () => {
	const { products } = useSelector((state: RootState) => state.products);
	const { categories } = useSelector((state: RootState) => state.categories);
	const { run } = useCrudDispatch();
	const dispatch = useDispatch<AppDispatch>();
	const { openModal, closeModal, isOpen, modalState } =
		useModalState<Product>();

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		dispatch(getAllCategoriesNoPagination());
	}, []);

	const {
		page,
		totalPages,
		hasNext,
		hasPrev,
		loading,
		goToPage,
		applyFilters,
	} = usePagination((state) => state.products, getAllProducts);

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
				<Loading loadingText={"Cargando productos..."} />
			</div>
		);
	}

	return (
		<Section>
			<div className="flex flex-col min-h-[93vh] animate-fadeInToBottom">
				<div className="flex flex-col gap-2 md:flex-row justify-between items-center mb-4">
					<div className="flex flex-col md:flex-row gap-2">
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
								...categories.map((c) => ({
									value: String(c.id),
									label: c.name,
								})),
							]}
							placeholder="Filtrar por categoria"
						/>
						{(nameValue || categoryValue) && (
							<Button
								variant="ghost"
								title="Limpiar filtros"
								onClick={() => {
									setNameValue("");
									setCategoryValue("");
									applyFilters({});
								}}
							>
								Limpiar filtros
							</Button>
						)}
					</div>
					<Button
						className="flex items-center gap-2"
						title="Crear producto"
						onClick={() => openModal("create")}
					>
						<SquarePlus size={20} />
						Nuevo producto
					</Button>
				</div>
				<div className="flex-1">
					{products.length ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
							{products.map((p) => (
								<ProductCard
									key={p.id}
									product={p}
									onEdit={(product) => openModal("edit", product)}
									onDelete={(product) => openModal("delete", product)}
									onAdjustStock={(product) =>
										openModal("adjust-stock", product)
									}
								/>
							))}
						</div>
					) : (
						<div className="grid place-content-center place-items-center h-[80vh]">
							<p className="text-md text-neutral-400">
								No hay productos para mostrar
							</p>
						</div>
					)}
				</div>
				<div className="mt-auto pt-4">
					<Pagination
						page={page}
						totalPages={totalPages}
						hasPrev={hasPrev}
						hasNext={hasNext}
						onPageChange={goToPage}
					/>
				</div>
			</div>
			<CreateProductModal open={isOpen("create")} onCancel={closeModal} />
			<EditProductModal
				open={isOpen("edit")}
				data={modalState?.data}
				onCancel={closeModal}
			/>
			<ConfirmModal
				open={isOpen("delete")}
				title="Eliminar producto"
				description="¿Estás seguro de que deseas eliminar este producto?"
				onCancel={closeModal}
				onConfirm={() => {
					run(deleteProduct, modalState?.data?.id);
					closeModal();
				}}
			/>
			<AdjustStockModal
				open={isOpen("adjust-stock")}
				data={modalState?.data}
				onCancel={closeModal}
			/>
		</Section>
	);
};

export default Products;
