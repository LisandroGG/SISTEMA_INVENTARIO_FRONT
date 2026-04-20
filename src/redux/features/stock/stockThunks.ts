import axios from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "@utils/errorHandler";
import type {
	AdjustStockData,
	MinStockData,
	Stock,
	StockResponse,
} from "./stockTypes";

export const getAllStocks = createAsyncThunk<
	Stock[],
	void,
	{ rejectValue: string }
>("stocks/getAllStocks", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<Stock[]>("/stocks");
		return response.data;
	} catch (error) {
		return rejectWithValue(getErrorMessage(error, "Error al obtener stocks"));
	}
});

export const getStockByProductId = createAsyncThunk<
	Stock,
	number,
	{ rejectValue: string }
>("stocks/getStockByProductId", async (id, { rejectWithValue }) => {
	try {
		const response = await axios.get<Stock>(`/stocks/${id}`);
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al obtener stock por ID"),
		);
	}
});

export const adjustStock = createAsyncThunk<
	StockResponse,
	AdjustStockData,
	{ rejectValue: string }
>("stocks/adjustStock", async (stockData, { rejectWithValue }) => {
	try {
		const response = await axios.put<StockResponse>(
			`/stocks/adjust/${stockData.id}`,
			stockData,
		);
		return response.data;
	} catch (error) {
		return rejectWithValue(getErrorMessage(error, "Error al actualizar stock"));
	}
});

export const updateMinStockData = createAsyncThunk<
	StockResponse,
	MinStockData,
	{ rejectValue: string }
>("stocks/updateMinQuantity", async (stockData, { rejectWithValue }) => {
	try {
		const response = await axios.put<StockResponse>(
			`/stocks/min/${stockData.id}`,
			stockData,
		);
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al actualizar stock minimo"),
		);
	}
});
