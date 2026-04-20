import { createSlice } from "@reduxjs/toolkit";
import {
	adjustStock,
	getAllStocks,
	getStockByProductId,
	updateMinStockData,
} from "./stockThunks";
import type { StockState } from "./stockTypes";

const initialState: StockState = {
	stocks: [],
	stock: null,
	loading: false,
	error: null,
};
const stockSlice = createSlice({
	name: "stocks",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//GET ALL STOCKS
			.addCase(getAllStocks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllStocks.fulfilled, (state, action) => {
				state.loading = false;
				state.stocks = action.payload;
			})
			.addCase(getAllStocks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al obtener stocks";
			})
			//GET STOCK BY PRODUCT ID
			.addCase(getStockByProductId.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getStockByProductId.fulfilled, (state, action) => {
				state.loading = false;
				state.stock = action.payload;
			})
			.addCase(getStockByProductId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al obtener stock del producto";
			})
			//ADJUST STOCK
			.addCase(adjustStock.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(adjustStock.fulfilled, (state, action) => {
				state.loading = false;

				const adjust = action.payload.stock;

				const index = state.stocks.findIndex((s) => s.id === adjust.id);

				if (index !== -1) {
					state.stocks[index] = adjust;
				}
				if (state.stock?.id === adjust.id) {
					state.stock = adjust;
				}
			})
			.addCase(adjustStock.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al ajustar stock";
			})
			//UPDATE MIN STOCK
			.addCase(updateMinStockData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateMinStockData.fulfilled, (state, action) => {
				state.loading = false;

				const updated = action.payload.stock;

				const index = state.stocks.findIndex((s) => s.id === updated.id);

				if (index !== -1) {
					state.stocks[index] = updated;
				}

				if (state.stock?.id === updated.id) {
					state.stock = updated;
				}
			})
			.addCase(updateMinStockData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al actualizar stock minimo";
			});
	},
});

export default stockSlice.reducer;
