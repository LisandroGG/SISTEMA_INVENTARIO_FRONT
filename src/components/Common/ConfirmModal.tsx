import { useEffect } from "react";
import Button from "./Button";

type ConfirmModalProps = {
	open: boolean;
	title?: string;
	description?: string;
	onCancel: () => void;
	onConfirm: () => void;
};

const ConfirmModal = ({
	open,
	title = "¿Estás seguro?",
	description,
	onCancel,
	onConfirm,
}: ConfirmModalProps) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onCancel();
			if (e.key === "Enter") onConfirm();
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onCancel, onConfirm]);
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 grid place-content-center">
			<button
				type="button"
				className="absolute inset-0 bg-black/40 backdrop-blur-xs"
				onClick={onCancel}
				aria-label="Cerrar modal"
			/>
			<div className="relative bg-neutral p-6 rounded-lg space-y-2">
				<h3 className="font-bold text-lg">{title}</h3>
				{description && <p>{description}</p>}
				<div className="flex justify-center gap-2">
					<Button
						className="w-full"
						text="Cancelar"
						variant="ghost"
						onClick={onCancel}
					/>
					<Button
						className="w-full"
						text="Confirmar"
						variant="danger"
						onClick={onConfirm}
					/>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
