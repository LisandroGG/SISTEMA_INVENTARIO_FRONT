import Input from "@components/Common/Input";
import Modal from "@components/Common/Modal";
import useCrudDispatch from "@hooks/useCrudDispatch";
import { updateCategory } from "@redux/features/category/categoryThunks";
import type { Category } from "@redux/features/category/categoryTypes";
import { useEffect, useMemo, useState } from "react";

type EditCategoryModalProps = {
	open: boolean;
	data?: Category;
	onCancel: () => void;
};

const EditCategoryModal = ({
	open,
	data,
	onCancel,
}: EditCategoryModalProps) => {
	const { run } = useCrudDispatch();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (open && data) {
			setName(data.name);
			setDescription(data.description || "");
			setError("");
		}
	}, [open, data]);

	const isValid = name.trim() !== "";

	const hasChanges = useMemo(() => {
		if (!data) return false;
		return name !== data.name || description !== (data.description || "");
	}, [name, description, data]);

	const handleSubmit = async () => {
		if (!isValid) {
			setError("El nombre es obligatorio");
			return;
		}

		try {
			if (!data) return;
			await run(updateCategory, {
				id: data.id,
				name: name.trim(),
				description: description.trim() || undefined,
			});
			onCancel();
		} catch {}
	};

	if (!open) return null;

	return (
		<Modal
			title="Editar categoría"
			confirmText="Guardar"
			onCancel={onCancel}
			onSubmit={handleSubmit}
			disabled={!isValid || !hasChanges}
			error={error}
		>
			<div className="flex flex-col gap-3 mb-3 w-100">
				<Input
					label="Nombre"
					placeholder="Nombre de la categoría"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					label="Descripción"
					placeholder="Descripción de la categoría"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
		</Modal>
	);
};

export default EditCategoryModal;
