export type Notification = {
	id: number;
	type: string;
	message: string;
	read: boolean;
	referenceId?: number;
	referenceType?: string;

	createdAt: string;
	updateAt: string;
};
