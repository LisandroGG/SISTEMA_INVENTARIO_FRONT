export type Notification = {
	id: number;
	type: string;
	message: string;
	read: boolean;
	referenceId?: number;
	referenceType?: string;

	createdAt: string;
	updatedAt: string;
};

export type NotificationState = {
	notifications: Notification[];
	unreadCount: number;
	loading: boolean;
	error: string | null;
	page: number;
	totalPages: number;
	totalItems: number;
	limit: number;
	hasNext: boolean;
	hasPrev: boolean;
};

export type GetNotificationsResponse = {
	data: Notification[];
	page: number;
	totalPages: number;
	totalItems: number;
	limit: number;
	hasNext: boolean;
	hasPrev: boolean;
};

export type NotificationResponse = {
	message: string;
};
