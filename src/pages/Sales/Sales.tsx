import Button from "@components/Common/Button";
import Loading from "@components/Common/Loading";
import Pagination from "@components/Common/Pagination.jsx";
import SearchInput from "@components/Common/SearchInput";
import Section from "@components/Common/Section";
import Select from "@components/Common/Select";
import useModalState from "@hooks/useModalState";
import usePagination from "@hooks/usePagination.js";
import { getAllSales } from "@redux/features/sale/saleThunks";
import type { RootState } from "@redux/store";
import { SquarePlus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CreateSaleModal from "./modals/CreateSaleModal";
import DetailSaleModal from "./modals/DetailSaleModal";
import SaleCard from "./SaleCard";

const Sales = () => {
	const { sales } = useSelector((state: RootState) => state.sales);
	const { openModal, closeModal, isOpen } = useModalState();
	const [selectedSaleId, setSelectedSaleId] = useState<number | null>(null);

	const {
		page,
		totalPages,
		hasNext,
		hasPrev,
		loading,
		goToPage,
		applyFilters,
	} = usePagination((state) => state.sales, getAllSales);

	const [clientNameValue, setClientNameValue] = useState("");
	const [statusValue, setStatusValue] = useState("");

	const handleNameSearch = () => {
		applyFilters({
			...(clientNameValue && { clientName: clientNameValue }),
			...(statusValue && { status: statusValue }),
		});
	};

	const handleStatusChange = (status: string) => {
		setStatusValue(status);
		applyFilters({
			...(clientNameValue && { clientName: clientNameValue }),
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
			<div className="flex flex-col min-h-[93vh] animate-fadeInToBottom">
				<div className="flex flex-col gap-2 md:flex-row justify-between items-center mb-4">
					<div className="flex flex-col md:flex-row gap-2">
						<SearchInput
							type="text"
							placeholder="Buscar venta por cliente..."
							value={clientNameValue}
							onChange={(e) => setClientNameValue(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleNameSearch()}
						/>
						<Select
							value={statusValue}
							onChange={(status) => handleStatusChange(status)}
							options={[
								{ value: "completed", label: "Completada" },
								{ value: "cancelled", label: "Cancelada" },
							]}
							placeholder="Filtrar por estado"
						/>
						{(clientNameValue || statusValue) && (
							<Button
								variant="ghost"
								title="Limpiar filtros"
								onClick={() => {
									setClientNameValue("");
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
					{sales.length ? (
						<div className="flex flex-col gap-1.5">
							{sales.map((s) => (
								<SaleCard
									key={s.id}
									sale={s}
									onViewDetail={(id) => setSelectedSaleId(id)}
								/>
							))}
						</div>
					) : (
						<div className="grid place-content-center place-items-center h-[80vh]">
							<p className="text-md text-neutral-400">
								No hay ventas para mostrar
							</p>
						</div>
					)}
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
			<CreateSaleModal open={isOpen("create")} onCancel={closeModal} />
			{selectedSaleId && (
				<DetailSaleModal
					id={selectedSaleId}
					onCancel={() => setSelectedSaleId(null)}
				/>
			)}
		</Section>
	);
};

export default Sales;
