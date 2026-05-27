import Input from "@components/Common/Input";
import Modal from "@components/Common/Modal";
import useCrudDispatch from "@hooks/useCrudDispatch";
import { createCategory } from "@redux/features/category/categoryThunks";
import { validateCategory } from "@utils/validations/categoryValidations";
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

	const clearFields = () => {
		setName("");
	};

	const handleCancel = () => {
		clearFields();
		onCancel();
	};

	const handleSubmit = async () => {
		const validationError = validateCategory(name);

		if (validationError) {
			setError(validationError);
			return;
		}

		setError("");

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
			onCancel={handleCancel}
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
