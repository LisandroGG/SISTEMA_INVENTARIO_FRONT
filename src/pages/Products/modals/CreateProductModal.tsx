import Input from "@components/Common/Input";
import Modal from "@components/Common/Modal";
import Select from "@components/Common/Select";
import useCrudDispatch from "@hooks/useCrudDispatch";
import { createProduct } from "@redux/features/products/productThunks";
import type { RootState } from "@redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

type CreateProductModalProps = {
	open: boolean;
	onCancel: () => void;
};

const CreateProductModal = ({ open, onCancel }: CreateProductModalProps) => {
	const { categories } = useSelector((state: RootState) => state.categories);
	const { run } = useCrudDispatch();

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [error, setError] = useState("");
	const [img, setImg] = useState<File | null>(null);
	const [quantity, setQuantity] = useState("");

	const isValid = name.trim() !== "" && price !== "" && categoryId !== "";

	const handleSubmit = async () => {
		if (!isValid) {
			setError("Nombre, precio y categoría son obligatorios");
			return;
		}

		try {
			await run(createProduct, {
				name: name.trim(),
				price: Number(price),
				img: img || undefined,
				description: description.trim() || undefined,
				categoryId: Number(categoryId),
				quantity: Number(quantity) || undefined,
			});
			onCancel();
		} catch {}
	};

	if (!open) return null;

	return (
		<Modal
			title="Nuevo producto"
			confirmText="Crear"
			onCancel={onCancel}
			onSubmit={handleSubmit}
			disabled={!isValid}
			error={error}
		>
			<div className="flex flex-col gap-3 mb-3 w-100">
				<Input
					label="Nombre"
					placeholder="Nombre del producto"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					label="Precio"
					type="number"
					placeholder="Precio"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<Input
					label="Descripción"
					placeholder="Descripción (opcional)"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<Select
					label="Categoría"
					value={categoryId}
					onChange={(val) => setCategoryId(val)}
					options={[
						{ value: "", label: "Seleccionar categoría" },
						...categories.map((c) => ({
							value: String(c.id),
							label: c.name,
						})),
					]}
				/>
				<Input
					label="Cantidad"
					type="number"
					placeholder="Cantidad en stock"
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>
				<Input
					label="Imagen"
					type="file"
					accept="image/*"
					onChange={(e) => setImg(e.target.files?.[0] || null)}
				/>
			</div>
		</Modal>
	);
};

export default CreateProductModal;
