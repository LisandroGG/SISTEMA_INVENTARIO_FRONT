import Button from "@components/Common/Button";
import Loading from "@components/Common/Loading";
import Pagination from "@components/Common/Pagination.jsx";
import Section from "@components/Common/Section";
import Select from "@components/Common/Select";
import Table from "@components/Common/Table";
import usePagination from "@hooks/usePagination.js";
import { getAllMovements } from "@redux/features/movement/movementThunks";
import type { Movement } from "@redux/features/movement/movementTypes";
import type { RootState } from "@redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const Movements = () => {
	const { movements } = useSelector((state: RootState) => state.movements);

	const {
		page,
		totalPages,
		hasNext,
		hasPrev,
		loading,
		goToPage,
		applyFilters,
	} = usePagination((state) => state.movements, getAllMovements);

	const [localFilters, setLocalFilters] = useState({
		type: "",
		dateFrom: "",
		dateTo: "",
	});

	const handleFilterChange = (key: string, value: string) => {
		let processedValue = value;

		if (key === "dateFrom" && value) {
			const [year, month, day] = value.split("-").map(Number);
			const date = new Date(year, month - 1, day, 0, 0, 0, 0);
			processedValue = date.toISOString();
		}
		if (key === "dateTo" && value) {
			const [year, month, day] = value.split("-").map(Number);
			const date = new Date(year, month - 1, day, 23, 59, 59, 999);
			processedValue = date.toISOString();
		}

		const newFilters = { ...localFilters, [key]: processedValue };
		setLocalFilters({ ...localFilters, [key]: value });
		applyFilters(
			Object.fromEntries(
				Object.entries(newFilters).filter(([_, v]) => v !== ""),
			),
		);
	};

	const handleClearFilters = () => {
		setLocalFilters({ type: "", dateFrom: "", dateTo: "" });
		applyFilters({});
	};

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando movimientos..."} />
			</div>
		);
	}

	const columns = [
		{
			key: "type",
			label: "tipo",
			width: "w-[10%]",
			render: (item: Movement) => (item.type === "IN" ? "Entrada" : "Salida"),
		},
		{
			key: "product",
			label: "Producto",
			width: "w-[20%]",
			render: (item: Movement) => item.product.name,
		},
		{
			key: "quantity",
			label: "Cantidad",
			width: "w-[10%]",
		},
		{
			key: "date",
			label: "Fecha",
			width: "w-[20%]",
			render: (item: Movement) =>
				item.createdAt
					? new Date(item.createdAt).toLocaleString("es-AR", {
							hour: "2-digit",
							minute: "2-digit",
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
							hour12: false,
						})
					: "-",
		},
		{
			key: "reason",
			label: "Motivo",
			width: "w-[30%]",
		},
		{
			key: "saleId",
			label: "Nro de venta",
			width: "w-[10%]",
			render: (item: Movement) => (item.saleId ? `#${item.saleId}` : "-"),
		},
	];

	return (
		<Section>
			<div className="flex flex-col min-h-[93vh] animate-fadeInToBottom">
				<div className="mb-4">
					<div className="flex flex-col md:flex-row gap-2">
						<Select
							value={localFilters.type}
							onChange={(val) => handleFilterChange("type", val)}
							options={[
								{ value: "IN", label: "Entrada" },
								{ value: "OUT", label: "Salida" },
							]}
							placeholder="Filtrar por tipo"
						/>
						<div className="flex items-center gap-2 border border-neutral-300 rounded-md px-3 py-1.5">
							<span className="text-xs text-neutral-400">Desde</span>
							<input
								type="date"
								value={localFilters.dateFrom}
								onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
								className="text-sm outline-none bg-transparent"
							/>
						</div>
						<div className="flex items-center gap-2 border border-neutral-300 rounded-md px-3 py-1.5">
							<span className="text-xs text-neutral-400">Hasta</span>
							<input
								type="date"
								value={localFilters.dateTo}
								onChange={(e) => handleFilterChange("dateTo", e.target.value)}
								className="text-sm outline-none bg-transparent"
							/>
						</div>
						{(localFilters.type ||
							localFilters.dateFrom ||
							localFilters.dateTo) && (
							<Button variant="ghost" onClick={handleClearFilters}>
								Limpiar filtros
							</Button>
						)}
					</div>
				</div>
				<div className="flex-1">
					<Table
						columns={columns}
						data={movements}
						emptyMessage="No hay movimientos para mostrar"
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
		</Section>
	);
};

export default Movements;
