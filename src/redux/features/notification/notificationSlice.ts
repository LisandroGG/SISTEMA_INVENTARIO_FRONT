import { createSlice } from "@reduxjs/toolkit";
import {
	deleteNotification,
	getAllNotifications,
	markAllNotificationAsRead,
	markNotificationAsRead,
} from "./notificationThunks";
import type { NotificationState } from "./notificationTypes";

const initialState: NotificationState = {
	notifications: [],
	loading: false,
	error: null,
};

const notificationSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//GET ALL NOTIFICATIONS
			.addCase(getAllNotifications.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllNotifications.fulfilled, (state, action) => {
				state.loading = false;
				state.notifications = action.payload;
			})
			.addCase(getAllNotifications.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al obtener notificaciones";
			})
			//MARK NOTIFICATION AS READ
			.addCase(markNotificationAsRead.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(markNotificationAsRead.fulfilled, (state, action) => {
				state.loading = false;
				const notification = state.notifications.find(
					(n) => n.id === action.meta.arg,
				);
				if (notification) notification.read = true;
			})
			.addCase(markNotificationAsRead.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload ?? "Error al marcar notificacion como leida";
			})
			//MARK ALL NOTIFICATIONS AS READ
			.addCase(markAllNotificationAsRead.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(markAllNotificationAsRead.fulfilled, (state) => {
				state.loading = false;
				state.notifications.forEach((n) => {
					n.read = true;
				});
			})
			.addCase(markAllNotificationAsRead.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload ??
					"Error al marcar todas las notificaciones como leidas";
			})
			//DELETE NOTIFICATION
			.addCase(deleteNotification.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteNotification.fulfilled, (state, action) => {
				state.loading = false;
				state.notifications = state.notifications.filter(
					(n) => n.id !== action.meta.arg,
				);
			})
			.addCase(deleteNotification.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al eliminar notification";
			});
	},
});

export default notificationSlice.reducer;
