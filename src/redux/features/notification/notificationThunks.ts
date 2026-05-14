import axios from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "@utils/errorHandler";
import type {
	GetNotificationsResponse,
	NotificationResponse,
} from "./notificationTypes";

export const getAllNotifications = createAsyncThunk<
	GetNotificationsResponse,
	Record<string, unknown>,
	{ rejectValue: string }
>("notifications/getAllNotifications", async (params, { rejectWithValue }) => {
	try {
		const response = await axios.get<GetNotificationsResponse>(
			"/notifications",
			{
				params,
			},
		);
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al obtener notificaciones"),
		);
	}
});

export const getUnreadCount = createAsyncThunk<
	number,
	void,
	{ rejectValue: string }
>("notifications/getUnreadCount", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<number>("/notifications/unread");
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al obtener notificaciones no leidas"),
		);
	}
});

export const markNotificationAsRead = createAsyncThunk<
	NotificationResponse,
	number,
	{ rejectValue: string }
>("notifications/markAsRead", async (id, { rejectWithValue }) => {
	try {
		const response = await axios.put<NotificationResponse>(
			`/notifications/${id}/read`,
		);
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al marcar notificacion como leida"),
		);
	}
});

export const markAllNotificationAsRead = createAsyncThunk<
	NotificationResponse,
	void,
	{ rejectValue: string }
>("notifications/markAllAsRead", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.put<NotificationResponse>(
			"/notifications/read-all",
		);
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(
				error,
				"Error al marcar todas las notificaciones como leidas",
			),
		);
	}
});

export const deleteNotification = createAsyncThunk<
	NotificationResponse,
	number,
	{ rejectValue: string }
>("notifications/deleteNotification", async (id, { rejectWithValue }) => {
	try {
		const response = await axios.delete<NotificationResponse>(
			`/notifications/${id}`,
		);
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al eliminar notificacion"),
		);
	}
});
