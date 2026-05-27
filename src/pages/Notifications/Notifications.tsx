import Button from "@components/Common/Button";
import ConfirmModal from "@components/Common/ConfirmModal";
import Loading from "@components/Common/Loading";
import Pagination from "@components/Common/Pagination.jsx";
import Section from "@components/Common/Section";
import useCrudDispatch from "@hooks/useCrudDispatch.js";
import useModalState from "@hooks/useModalState";
import usePagination from "@hooks/usePagination.js";
import {
	deleteNotification,
	getAllNotifications,
	markAllNotificationAsRead,
	markNotificationAsRead,
} from "@redux/features/notification/notificationThunks";
import type { RootState } from "@redux/store";
import { useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";

const Notifications = () => {
	const { notifications } = useSelector(
		(state: RootState) => state.notifications,
	);
	const { run } = useCrudDispatch();
	const { openModal, closeModal, isOpen, modalState } = useModalState<{
		id?: number;
	}>();

	const { page, totalPages, hasNext, hasPrev, loading, goToPage } =
		usePagination((state) => state.notifications, getAllNotifications);

	if (loading) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando notificaciones..."} />
			</div>
		);
	}

	return (
		<Section>
			<div className="flex flex-col min-h-[93vh] animate-fadeInToBottom">
				<div className="flex items-center justify-center md:justify-end mb-4">
					<Button variant="primary" onClick={() => openModal("mark-all")}>
						Marcar todas como leídas
					</Button>
				</div>
				<div className="flex-1">
					<div className="flex flex-col gap-1.5">
						{notifications.map((n) => (
							<NotificationItem
								key={n.id}
								notification={n}
								onMarkAsRead={(id) => openModal("mark-read", { id })}
								onDelete={(id) => openModal("delete", { id })}
							/>
						))}
					</div>
				</div>
				<div className="mt-auto pt-4">
					<Pagination
						page={page}
						totalPages={totalPages}
						hasNext={hasNext}
						hasPrev={hasPrev}
						onPageChange={goToPage}
					/>
				</div>
			</div>
			<ConfirmModal
				open={isOpen("mark-read")}
				title="Marcar como leída"
				description="¿Marcar esta notificación como leída?"
				onCancel={closeModal}
				onConfirm={() => {
					run(markNotificationAsRead, modalState?.data?.id);
					closeModal();
				}}
			/>
			<ConfirmModal
				open={isOpen("mark-all")}
				title="Marcar todas como leídas"
				description="¿Marcar todas las notificaciones como leídas?"
				onCancel={closeModal}
				onConfirm={() => {
					run(markAllNotificationAsRead);
					closeModal();
				}}
			/>
			<ConfirmModal
				open={isOpen("delete")}
				title="Eliminar notificación"
				description="¿Estás seguro de que deseas eliminar esta notificación?"
				onCancel={closeModal}
				onConfirm={() => {
					run(deleteNotification, modalState?.data?.id);
					closeModal();
				}}
			/>
		</Section>
	);
};

export default Notifications;
