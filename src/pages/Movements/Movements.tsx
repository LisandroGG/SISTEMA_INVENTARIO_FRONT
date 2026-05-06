import Loading from "@components/Common/Loading";
import Pagination from "@components/Common/Pagination.jsx";
import Section from "@components/Common/Section";
import Table from "@components/Common/Table";
import usePagination from "@hooks/usePagination.js";
import { getAllMovements } from "@redux/features/movement/movementThunks";
import type { Movement } from "@redux/features/movement/movementTypes";
import type { RootState } from "@redux/store";
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
							weekday: "long",
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
			<div className="flex flex-col min-h-[93vh]">
				<div className="mb-4">Busqueda</div>
				<div className="flex-1">
					<Table
						columns={columns}
						data={movements}
						emptyMessage="No hay movimientos"
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
