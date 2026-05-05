import Input from "@components/Common/Input";
import Modal from "@components/Common/Modal";
import Select from "@components/Common/Select";
import useCrudDispatch from "@hooks/useCrudDispatch";
import { updateProduct } from "@redux/features/products/productThunks";
import type { Product } from "@redux/features/products/productTypes";
import type { RootState } from "@redux/store";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

type EditProductModalProps = {
	open: boolean;
	data?: Product;
	onCancel: () => void;
};

const EditProductModal = ({ open, data, onCancel }: EditProductModalProps) => {
	const { categories } = useSelector((state: RootState) => state.categories);
	const { run } = useCrudDispatch();

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [error, setError] = useState("");
	const [img, setImg] = useState<File | null>(null);

	useEffect(() => {
		if (open && data) {
			setName(data.name);
			setPrice(String(data.price));
			setDescription(data.description || "");
			setCategoryId(String(data.categoryId));
			setImg(data.img ? null : null);
			setError("");
		}
	}, [open, data]);

	const isValid = name.trim() !== "" && price !== "" && categoryId !== "";

	const hasChanges = useMemo(() => {
		if (!data) return false;
		return (
			name !== data.name ||
			price !== String(data.price) ||
			description !== (data.description || "") ||
			categoryId !== String(data.categoryId)
		);
	}, [name, price, description, categoryId, data]);

	const handleSubmit = async () => {
		if (!isValid) {
			setError("Nombre, precio y categoría son obligatorios");
			return;
		}

		try {
			if (!data) return;
			await run(updateProduct, {
				id: data?.id,
				name: name.trim(),
				price: Number(price),
				description: description.trim() || undefined,
				categoryId: Number(categoryId),
				img: img || undefined,
			});
			onCancel();
		} catch {}
	};

	if (!open) return null;

	return (
		<Modal
			title="Editar producto"
			confirmText="Guardar"
			onCancel={onCancel}
			onSubmit={handleSubmit}
			disabled={!isValid || !hasChanges}
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
			</div>
		</Modal>
	);
};

export default EditProductModal;
