import Button from "@components/Common/Button";
import ConfirmModal from "@components/Common/ConfirmModal";
import Loading from "@components/Common/Loading";
import Pagination from "@components/Common/Pagination.jsx";
import Section from "@components/Common/Section";
import Select from "@components/Common/Select";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import useModalState from "@hooks/useModalState";
import usePagination from "@hooks/usePagination.js";
import { createSale, getAllSales } from "@redux/features/sale/saleThunks";
import type { RootState } from "@redux/store";
import { SquarePlus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import SaleCard from "./SaleCard";

const Sales = () => {
	const { sales } = useSelector((state: RootState) => state.sales);
	const { run } = useCrudDispatch();
	const { openModal, closeModal, isOpen, modalState } = useModalState<{
		id?: number;
	}>();

	const {
		page,
		totalPages,
		hasNext,
		hasPrev,
		loading,
		goToPage,
		applyFilters,
	} = usePagination((state) => state.sales, getAllSales);

	const [statusValue, setStatusValue] = useState("");

	const handleStatusChange = (status: string) => {
		setStatusValue(status);
		applyFilters({
			...(status && { status: status }),
		});
	};

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando ventas..."} />
			</div>
		);
	}

	return (
		<Section>
			<div className="flex flex-col min-h-[93vh]">
				<div className="flex flex-col gap-2 md:flex-row justify-between items-center mb-4">
					<div className="flex flex-col md:flex-row gap-2">
						<Select
							value={statusValue}
							onChange={(status) => handleStatusChange(status)}
							options={[
								{ value: "completed", label: "Completada" },
								{ value: "cancelled", label: "Cancelada" },
							]}
							placeholder="Filtrar por estado"
						/>
						{statusValue && (
							<Button
								variant="ghost"
								title="Limpiar filtros"
								onClick={() => {
									setStatusValue("");
									applyFilters({});
								}}
							>
								Limpiar filtros
							</Button>
						)}
					</div>
					<Button
						className="flex items-center gap-2"
						title="Crear categoria"
						onClick={() => openModal("create")}
					>
						<SquarePlus size={20} />
						Nueva Venta
					</Button>
				</div>
				<div className="flex-1">
					<div className="flex flex-col gap-1.5">
						{sales.map((s) => (
							<SaleCard key={s.id} sale={s} />
						))}
					</div>
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
		</Section>
	);
};

export default Sales;
