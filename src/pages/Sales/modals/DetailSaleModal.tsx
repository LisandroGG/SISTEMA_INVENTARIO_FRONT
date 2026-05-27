import Button from "@components/Common/Button";
import ConfirmModal from "@components/Common/ConfirmModal";
import Loading from "@components/Common/Loading";
import useCrudDispatch from "@hooks/useCrudDispatch";
import { cancelSale, getSaleById } from "@redux/features/sale/saleThunks";
import type { AppDispatch, RootState } from "@redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type DetailSaleModalProps = {
	id: number;
	onCancel: () => void;
};

const DetailSaleModal = ({ id, onCancel }: DetailSaleModalProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { run } = useCrudDispatch();
	const { sale, detailLoading } = useSelector(
		(state: RootState) => state.sales,
	);
	const [openConfirm, setOpenConfirm] = useState(false);

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		dispatch(getSaleById(id));
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && !openConfirm) {
				onCancel();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onCancel, openConfirm]);

	const handleCancelSale = async () => {
		try {
			await run(cancelSale, id);

			setOpenConfirm(false);
			onCancel();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="fixed inset-0 z-50 grid place-content-center">
			<button
				type="button"
				className="absolute inset-0 bg-black/40 backdrop-blur-xs"
				onClick={onCancel}
				aria-label="Cerrar modal"
			/>
			<div className="relative bg-neutral p-6 rounded-lg w-100 md:w-130 flex flex-col gap-4">
				{detailLoading ? (
					<div className="flex justify-center py-8">
						<Loading loadingText="Cargando detalle..." />
					</div>
				) : (
					<>
						<div className="flex items-center justify-between">
							<div>
								<h2 className="font-bold text-lg text-secondary">
									Venta #{sale?.id}
								</h2>
								{sale?.clientName && (
									<span className="text-sm text-neutral-500">
										{sale.clientName}
									</span>
								)}
							</div>
							<div className="flex flex-col items-end gap-1">
								<span
									className={`px-3 py-1 text-xs font-semibold rounded-full ${sale?.status === "completed" ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-500"}`}
								>
									{sale?.status === "completed" ? "Completada" : "Cancelada"}
								</span>
								<span className="text-xs text-neutral-400">
									{sale?.createdAt
										? new Date(sale.createdAt).toLocaleString("es-AR", {
												day: "2-digit",
												month: "2-digit",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit",
												hour12: false,
											})
										: null}
								</span>
							</div>
						</div>

						<div>
							<span className="text-xs font-semibold text-neutral-400 uppercase">
								Productos
							</span>
							<div className="flex flex-col gap-2 mt-2 max-h-52 overflow-y-auto pr-1">
								{sale?.items.map((i) => (
									<div
										key={i.id}
										className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200"
									>
										<div className="flex flex-col">
											<span className="text-sm font-semibold text-secondary">
												{i.product.name}
											</span>
											<span className="text-xs text-neutral-400">
												Precio unitario: ${i.unitPrice.toFixed(2)}
											</span>
										</div>
										<div className="flex items-center gap-4">
											<span className="text-xs text-neutral-500">
												x{i.quantity}
											</span>
											<span className="text-sm font-semibold text-secondary w-25 text-right">
												${(i.quantity * i.unitPrice).toFixed(2)}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="flex items-center justify-between pt-2 border-t border-neutral-200">
							<span className="font-semibold text-neutral-600">Total</span>
							<span className="font-bold text-lg text-secondary">
								${Number(sale?.total).toFixed(2)}
							</span>
						</div>

						<div className="flex justify-between gap-2">
							<Button
								text="Cerrar"
								className="w-full"
								variant="ghost"
								title="Cerrar detalle"
								onClick={onCancel}
							/>

							{sale?.status !== "cancelled" && (
								<Button
									text="Cancelar"
									className="w-full"
									variant="danger"
									title="Cancelar compra"
									onClick={() => setOpenConfirm(true)}
								/>
							)}
						</div>
					</>
				)}
			</div>
			<ConfirmModal
				open={openConfirm}
				title="Cancelar venta"
				description="¿Seguro que deseas cancelar esta venta?"
				onCancel={() => setOpenConfirm(false)}
				onConfirm={handleCancelSale}
			/>
		</div>
	);
};

export default DetailSaleModal;
