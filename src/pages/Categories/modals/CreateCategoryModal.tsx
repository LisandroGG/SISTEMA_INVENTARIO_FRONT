import Input from "@components/Common/Input";
import Modal from "@components/Common/Modal";
import useCrudDispatch from "@hooks/useCrudDispatch";
import { createCategory } from "@redux/features/category/categoryThunks";
import { useState } from "react";

type CreateCategoryModalProps = {
	open: boolean;
	onCancel: () => void;
};

const CreateCategoryModal = ({ open, onCancel }: CreateCategoryModalProps) => {
	const { run } = useCrudDispatch();

	const [name, setName] = useState("");
	const [error, setError] = useState("");

	const isValid = name.trim() !== "";

	const handleSubmit = async () => {
		if (!isValid) {
			setError("El nombre es obligatorio");
			return;
		}

		try {
			await run(createCategory, {
				name: name.trim(),
			});
			onCancel();
		} catch {}
	};

	if (!open) return null;

	return (
		<Modal
			title="Nueva categoría"
			confirmText="Crear"
			onCancel={onCancel}
			onSubmit={handleSubmit}
			disabled={!isValid}
			error={error}
		>
			<div className="flex flex-col gap-3 mb-3 w-100">
				<Input
					label="Nombre"
					placeholder="Nombre de la categoría"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
		</Modal>
	);
};

export default CreateCategoryModal;
