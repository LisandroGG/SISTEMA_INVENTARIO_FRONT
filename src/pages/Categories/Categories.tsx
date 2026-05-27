import Button from "@components/Common/Button";
import ConfirmModal from "@components/Common/ConfirmModal";
import Loading from "@components/Common/Loading";
import Pagination from "@components/Common/Pagination.jsx";
import SearchInput from "@components/Common/SearchInput";
import Section from "@components/Common/Section";
import Table from "@components/Common/Table";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import useModalState from "@hooks/useModalState";
import usePagination from "@hooks/usePagination.js";
import {
	deleteCategory,
	getAllCategories,
} from "@redux/features/category/categoryThunks";
import type { Category } from "@redux/features/category/categoryTypes";
import type { RootState } from "@redux/store";
import { Pencil, SquarePlus, Trash } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CreateCategoryModal from "./modals/CreateCategoryModal";
import EditCategoryModal from "./modals/EditCategoryModal";

const Categories = () => {
	const { categories } = useSelector((state: RootState) => state.categories);
	const { run } = useCrudDispatch();
	const { openModal, closeModal, isOpen, modalState } =
		useModalState<Category>();

	const {
		page,
		totalPages,
		hasNext,
		hasPrev,
		loading,
		goToPage,
		applyFilters,
	} = usePagination((state) => state.categories, getAllCategories);

	const [nameValue, setNameValue] = useState("");

	const handleNameSearch = () => {
		applyFilters({
			...(nameValue && { name: nameValue }),
		});
	};

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando categorias..."} />
			</div>
		);
	}

	const columns = [
		{
			key: "name",
			label: "NOMBRE",
			width: "w-[30%]",
		},
		{
			key: "totalProducts",
			label: "PRODUCTOS",
			width: "w-[15%]",
			render: (item: Category) => item.totalProducts || 0,
		},
	];

	const renderActions = (category: Category) => {
		return (
			<>
				<Button
					variant="primary"
					title="Editar"
					onClick={() => openModal("edit", category)}
				>
					<Pencil size={12} />
				</Button>
				<Button
					variant="danger"
					title="Eliminar"
					onClick={() => openModal("delete", category)}
				>
					<Trash size={12} />
				</Button>
			</>
		);
	};

	return (
		<Section>
			<div className="flex flex-col min-h-[93vh] animate-fadeInToBottom">
				<div className="flex flex-col gap-2 md:flex-row justify-between items-center mb-4">
					<SearchInput
						type="text"
						placeholder="Buscar categoria..."
						value={nameValue}
						onChange={(e) => setNameValue(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleNameSearch()}
					/>
					<Button
						className="flex items-center gap-2"
						title="Crear categoria"
						onClick={() => openModal("create")}
					>
						<SquarePlus size={20} />
						Nueva categoria
					</Button>
				</div>
				<div className="flex-1">
					<Table
						columns={columns}
						data={categories}
						renderActions={renderActions}
						emptyMessage="No hay categorias"
					/>
				</div>
				<div className="mt-auto pt-4">
					<Pagination
						page={page}
						totalPages={totalPages}
						hasNext={hasNext}
						hasPrev={hasPrev}
						onPageChange={goToPage}
					/>
				</div>
			</div>
			<CreateCategoryModal open={isOpen("create")} onCancel={closeModal} />
			<EditCategoryModal
				open={isOpen("edit")}
				data={modalState?.data}
				onCancel={closeModal}
			/>
			<ConfirmModal
				open={isOpen("delete")}
				title="Eliminar categoria"
				description="¿Estás seguro de que deseas eliminar esta categoria?"
				onCancel={closeModal}
				onConfirm={() => {
					run(deleteCategory, modalState?.data?.id);
					closeModal();
				}}
			/>
		</Section>
	);
};

export default Categories;
