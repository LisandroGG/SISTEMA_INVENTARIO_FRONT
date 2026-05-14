import { useState } from "react";

type ModalType =
	| "create"
	| "edit"
	| "delete"
	| "adjust-stock"
	| "mark-all"
	| "mark-read";

type ModalState<T> = {
	type: ModalType;
	data?: T;
} | null;

const useModalState = <T>() => {
	const [modalState, setModalState] = useState<ModalState<T>>(null);

	const openModal = (type: ModalType, data?: T) => {
		setModalState({ type, data });
	};

	const closeModal = () => setModalState(null);

	const isOpen = (type: ModalType) => modalState?.type === type;

	return {
		modalState,
		openModal,
		closeModal,
		isOpen,
	};
};

export default useModalState;
