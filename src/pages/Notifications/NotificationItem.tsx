import Button from "@components/Common/Button";
import type { Notification } from "@redux/features/notification/notificationTypes";
import { Bell, Check, Settings, Trash } from "lucide-react";

const notificationTypeLabel: Record<string, string> = {
	low_stock: "Stock bajo",
	sale_completed: "Venta",
	adjustment: "Ajuste de inventario",
	sale_canceled: "Venta cancelada",
};

const notificationTypeColor: Record<string, string> = {
	low_stock: "bg-tertiary/10 text-tertiary",
	sale_completed: "bg-primary/10 text-primary",
	adjustment: "bg-secondary/10 text-secondary",
	sale_canceled: "bg-red-500/10 text-red-500",
};

const notificationTypeIcon: Record<string, React.ReactNode> = {
	low_stock: <Bell size={16} />,
	sale_completed: <Check size={16} />,
	adjustment: <Settings size={16} />,
	sale_canceled: <Trash size={16} />,
};

type NotificationItemProps = {
	notification: Notification;
	onMarkAsRead: (id: number) => void;
	onDelete: (id: number) => void;
};

const NotificationItem = ({
	notification,
	onMarkAsRead,
	onDelete,
}: NotificationItemProps) => {
	return (
		<div
			className={`flex items-center gap-4 p-4 shadow-md rounded-lg border transition-colors ${notification.read ? "bg-white border-neutral-200" : "bg-primary/5 border-primary/20"}`}
		>
			<div
				className={`p-2 rounded-full shrink-0 ${notificationTypeColor[notification.type] ?? "bg-neutral-100 text-neutral-600"}`}
			>
				{notificationTypeIcon[notification.type] ?? <Bell size={16} />}
			</div>

			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-1">
					<span className="text-sm font-semibold text-neutral-800">
						{notificationTypeLabel[notification.type] ?? notification.type}
					</span>
					{!notification.read && (
						<span className="w-2 h-2 rounded-full bg-primary shrink-0" />
					)}
				</div>
				<p className="text-sm text-neutral-600">{notification.message}</p>
				<span className="text-xs text-neutral-400 mt-1 block">
					{new Date(notification.createdAt).toLocaleString("es-AR", {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
						hour12: false,
					})}
				</span>
			</div>

			<div className="flex gap-1 shrink-0">
				{!notification.read && (
					<Button
						variant="primary"
						title="Marcar como leída"
						onClick={() => onMarkAsRead(notification.id)}
					>
						<Check size={14} />
					</Button>
				)}
				<Button
					variant="danger"
					title="Eliminar"
					onClick={() => onDelete(notification.id)}
				>
					<Trash size={14} />
				</Button>
			</div>
		</div>
	);
};

export default NotificationItem;
