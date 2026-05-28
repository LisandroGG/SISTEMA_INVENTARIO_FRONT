import axios from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "@utils/errorHandler";
import type { Stats } from "./statsType";

export const getDashboardStats = createAsyncThunk<
	Stats,
	void,
	{ rejectValue: string }
>("stats/getDashboardStats", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<Stats>("/stats");
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al obtener estadisticas"),
		);
	}
});
