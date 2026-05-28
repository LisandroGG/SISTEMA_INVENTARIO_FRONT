import Input from "@components/Common/Input";
import Modal from "@components/Common/Modal";
import Select from "@components/Common/Select";
import useCrudDispatch from "@hooks/useCrudDispatch";
import { createProduct } from "@redux/features/products/productThunks";
import type { RootState } from "@redux/store";
import { validateCreateProduct } from "@utils/validations/productValidations";
import { useState } from "react";
import { useSelector } from "react-redux";
import ImageCropModal from "./ImageCropModal";

type CreateProductModalProps = {
	open: boolean;
	onCancel: () => void;
};

const CreateProductModal = ({ open, onCancel }: CreateProductModalProps) => {
	const { categories } = useSelector((state: RootState) => state.categories);
	const { run } = useCrudDispatch();

	const [cropModalOpen, setCropModalOpen] = useState(false);
	const [tempImage, setTempImage] = useState("");

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [error, setError] = useState("");
	const [img, setImg] = useState<File | null>(null);
	const [quantity, setQuantity] = useState("");

	const isValid =
		name.trim() !== "" &&
		price.trim() !== "" &&
		quantity.trim() !== "" &&
		categoryId.trim() !== "";

	const clearFields = () => {
		setName("");
		setPrice("");
		setCategoryId("");
		setQuantity("");
		setError("");
	};

	const handleCancel = () => {
		clearFields();
		onCancel();
	};

	const handleSubmit = async () => {
		const validationError = validateCreateProduct(
			name,
			price,
			quantity,
			Number(categoryId),
		);

		if (validationError) {
			setError(validationError);
			return;
		}

		setError("");

		try {
			await run(createProduct, {
				name: name.trim(),
				price: Number(price),
				img: img || undefined,
				categoryId: Number(categoryId),
				quantity: Number(quantity),
			});

			onCancel();
		} catch {}
	};

	if (!open) return null;

	return (
		<Modal
			title="Nuevo producto"
			confirmText="Crear"
			onCancel={handleCancel}
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
				<Select
					label="Categoría"
					value={categoryId}
					onChange={(val) => setCategoryId(val)}
					options={[
						...categories.map((c) => ({
							value: String(c.id),
							label: c.name,
						})),
					]}
					placeholder="Seleccione una categoria"
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
					onChange={(e) => {
						const file = e.target.files?.[0];

						if (!file) return;

						const imageUrl = URL.createObjectURL(file);
						setTempImage(imageUrl);
						setCropModalOpen(true);
					}}
				/>
				<ImageCropModal
					open={cropModalOpen}
					image={tempImage}
					onCancel={() => setCropModalOpen(false)}
					onConfirm={(file) => {
						setImg(file);
						setCropModalOpen(false);
					}}
				/>
			</div>
		</Modal>
	);
};

export default CreateProductModal;
