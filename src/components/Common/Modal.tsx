import Button from "@components/Common/Button";
import ErrorMessage from "@components/Common/ErrorMessage";

type ModalProps = {
	title: string;
	confirmText: string;
	buttonVariant?: "primary" | "secondary" | "danger" | "ghost";
	children: React.ReactNode;
	onCancel: () => void;
	onSubmit: () => void;
	disabled?: boolean;
	error?: string;
};

const Modal = ({
	title,
	confirmText,
	buttonVariant,
	children,
	onCancel,
	onSubmit,
	disabled,
	error,
}: ModalProps) => {
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
				<div>{children}</div>
				{error ? (
					<div>
						<ErrorMessage message={error} />
					</div>
				) : (
					""
				)}
				<div className="flex justify-center gap-2">
					<Button
						className="w-full"
						text="Cancelar"
						variant="ghost"
						onClick={onCancel}
					/>
					<Button
						className="w-full"
						text={confirmText}
						variant={buttonVariant}
						onClick={onSubmit}
						disabled={disabled}
					/>
				</div>
			</div>
		</div>
	);
};

export default Modal;
