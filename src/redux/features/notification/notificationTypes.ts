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
	loading: boolean;
	error: string | null;
};

export type NotificationResponse = {
	message: string;
};
