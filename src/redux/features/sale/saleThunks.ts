import axios from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "@utils/errorHandler";
import type {
	CreateSaleData,
	GetSalesParams,
	GetSalesResponse,
	Sale,
	SaleResponse,
} from "./saleTypes";

export const getAllSales = createAsyncThunk<
	GetSalesResponse,
	GetSalesParams,
	{ rejectValue: string }
>("sales/getAllSales", async (params, { rejectWithValue }) => {
	try {
		const response = await axios.get<GetSalesResponse>("/sales", {
			params,
		});
		return response.data;
	} catch (error) {
		return rejectWithValue(getErrorMessage(error, "Error al obtener ventas"));
	}
});

export const getSaleById = createAsyncThunk<
	Sale,
	number,
	{ rejectValue: string }
>("sales/getSaleById", async (id, { rejectWithValue }) => {
	try {
		const response = await axios.get<Sale>(`/sales/${id}`);
		return response.data;
	} catch (error) {
		return rejectWithValue(getErrorMessage(error, "Error al obtener venta"));
	}
});

export const createSale = createAsyncThunk<
	SaleResponse,
	CreateSaleData,
	{ rejectValue: string }
>("sales/createSale", async (saleData, { rejectWithValue }) => {
	try {
		const response = await axios.post<SaleResponse>("/sales", saleData);
		return response.data;
	} catch (error) {
		return rejectWithValue(getErrorMessage(error, "Error al crear venta"));
	}
});

export const cancelSale = createAsyncThunk<
	SaleResponse,
	number,
	{ rejectValue: string }
>("sales/cancelSale", async (id, { rejectWithValue }) => {
	try {
		const response = await axios.post<SaleResponse>(`/sales/cancel/${id}`);
		return response.data;
	} catch (error) {
		return rejectWithValue(getErrorMessage(error, "Error al cancelar venta"));
	}
});
