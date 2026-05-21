import Button from "@components/Common/Button";
import Input from "@components/Common/Input";
import Modal from "@components/Common/Modal";
import Select from "@components/Common/Select";
import useCrudDispatch from "@hooks/useCrudDispatch";
import { getAllProductsNoPagination } from "@redux/features/products/productThunks";
import { createSale } from "@redux/features/sale/saleThunks";
import type { AppDispatch, RootState } from "@redux/store";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type CreateSaleModalProps = {
	open: boolean;
	onCancel: () => void;
};

const CreateSaleModal = ({ open, onCancel }: CreateSaleModalProps) => {
	const { products } = useSelector((state: RootState) => state.products);

	const { run } = useCrudDispatch();

	const [items, setItems] = useState<{ productId: number; quantity: number }[]>(
		[{ productId: 0, quantity: 1 }],
	);

	const [clientName, setClientName] = useState("");
	const [error, setError] = useState("");
	const dispatch = useDispatch<AppDispatch>();

	// biome-ignore lint: useEffectBug
	useEffect(() => {
		dispatch(getAllProductsNoPagination());
	}, []);

	const isValid =
		clientName.trim() !== "" &&
		items.length > 0 &&
		items.every((item) => item.productId > 0 && item.quantity > 0);

	const updateItem = (
		index: number,
		field: "productId" | "quantity",
		value: number,
	) => {
		setItems((prev) =>
			prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
		);
	};

	const addItem = () => {
		setItems((prev) => [...prev, { productId: 0, quantity: 1 }]);
	};

	const removeItem = (index: number) => {
		setItems((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = async () => {
		setError("");

		if (!isValid) {
			setError(
				"Todos los productos deben ser válidos y tener cantidad mayor a 0",
			);
			return;
		}

		try {
			await run(createSale, {
				clientName: clientName.trim(),
				items,
			});

			setClientName("");
			setItems([{ productId: 0, quantity: 1 }]);

			onCancel();
		} catch {
			setError("Error al crear la venta");
		}
	};

	if (!open) return null;

	return (
		<Modal
			title="Nueva venta"
			confirmText="Crear"
			onCancel={onCancel}
			onSubmit={handleSubmit}
			disabled={!isValid}
			error={error}
		>
			<div className="flex flex-col gap-4 w-full">
				<Input
					label="Nombre del cliente"
					value={clientName}
					onChange={(e) => setClientName(e.target.value)}
				/>

				<div className="flex flex-col gap-3">
					{items.map((item, index) => (
						<div key={`${item.productId}`} className="flex items-end gap-2">
							<div className="flex-1">
								<Select
									label="Producto"
									value={String(item.productId)}
									options={[
										{
											value: "",
											label: "Seleccionar producto",
										},
										...products.map((product) => ({
											value: String(product.id),
											label: product.name,
										})),
									]}
									onChange={(value) =>
										updateItem(index, "productId", Number(value))
									}
								/>
							</div>

							<div className="w-28">
								<Input
									className="h-9.5"
									label="Cantidad"
									type="number"
									min={1}
									value={item.quantity}
									onChange={(e) =>
										updateItem(index, "quantity", Number(e.target.value))
									}
								/>
							</div>

							<Button
								onClick={() => removeItem(index)}
								disabled={items.length === 1}
								variant="danger"
								className="h-9.5 shrink-0 p-0"
							>
								<Trash2 size={18} />
							</Button>
						</div>
					))}
				</div>

				<Button
					variant="ghost"
					onClick={addItem}
					className="flex items-center justify-center gap-2"
				>
					<Plus size={18} />
					Agregar producto
				</Button>
			</div>
		</Modal>
	);
};

export default CreateSaleModal;
