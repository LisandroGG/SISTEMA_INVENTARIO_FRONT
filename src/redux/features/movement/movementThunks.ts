import axios from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "@utils/errorHandler";
import type { GetMovementsParams, GetMovementsResponse } from "./movementTypes";

export const getAllMovements = createAsyncThunk<
	GetMovementsResponse,
	GetMovementsParams,
	{ rejectValue: string }
>("movements/getAllMovements", async (params, { rejectWithValue }) => {
	try {
		const response = await axios.get<GetMovementsResponse>("/movements", {
			params,
		});
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al obtener movimientos de stock"),
		);
	}
});
