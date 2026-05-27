import Input from "@components/Common/Input";
import Modal from "@components/Common/Modal";
import Select from "@components/Common/Select";
import useCrudDispatch from "@hooks/useCrudDispatch";
import type { Product } from "@redux/features/products/productTypes";
import {
	adjustStock,
	updateMinStockData,
} from "@redux/features/stock/stockThunks";
import { validateQuantity } from "@utils/validations/productValidations";
import { useEffect, useMemo, useState } from "react";

type AdjustStockModalProps = {
	open: boolean;
	data?: Product;
	onCancel: () => void;
};

const AdjustStockModal = ({ open, data, onCancel }: AdjustStockModalProps) => {
	const { run } = useCrudDispatch();

	const [quantity, setQuantity] = useState("");
	const [minQuantity, setMinQuantity] = useState("");
	const [reason, setReason] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (open && data) {
			setQuantity(String(data.stock.quantity));
			setMinQuantity(String(data.stock.minQuantity));
			setReason("");
		}
	}, [open, data]);

	const stockChanged = useMemo(() => {
		if (!data) return false;

		return quantity !== String(data.stock.quantity);
	}, [quantity, data]);

	const hasChanges = useMemo(() => {
		if (!data) return false;

		return (
			quantity !== String(data.stock.quantity) ||
			minQuantity !== String(data.stock.minQuantity)
		);
	}, [quantity, minQuantity, data]);

	const handleCancel = () => {
		setError("");
		onCancel();
	};

	const handleSubmit = async () => {
		if (!data) return;

		const validationError = validateQuantity(quantity, minQuantity);

		if (validationError) {
			setError(validationError);
			return;
		}

		setError("");

		try {
			if (stockChanged) {
				await run(adjustStock, {
					id: data.stock.id,
					quantity: Number(quantity),
					reason,
				});
			}

			if (minQuantity !== String(data.stock.minQuantity)) {
				await run(updateMinStockData, {
					id: data.stock.id,
					minQuantity: Number(minQuantity),
				});
			}

			onCancel();
		} catch {}
	};

	if (!open) return null;

	return (
		<Modal
			title="Ajustar stock"
			confirmText="Guardar"
			onCancel={handleCancel}
			onSubmit={handleSubmit}
			disabled={!hasChanges || (stockChanged && !reason)}
			error={error}
		>
			<div className="flex flex-col gap-3 mb-3">
				<Input
					label="Stock disponible"
					type="number"
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>

				<Input
					label="Stock mínimo"
					type="number"
					value={minQuantity}
					onChange={(e) => setMinQuantity(e.target.value)}
				/>
				{stockChanged && (
					<Select
						label="Motivo del ajuste"
						value={reason}
						onChange={setReason}
						options={[
							{ value: "", label: "Seleccionar motivo" },
							{ value: "Producto dañado", label: "Producto dañado" },
							{ value: "Pérdida", label: "Pérdida" },
							{ value: "Ajuste manual", label: "Ajuste manual" },
							{ value: "Ingreso", label: "Ingreso" },
							{
								value: "Corrección de inventario",
								label: "Corrección de inventario",
							},
						]}
					/>
				)}
			</div>
		</Modal>
	);
};

export default AdjustStockModal;
