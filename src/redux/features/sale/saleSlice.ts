import { createSlice } from "@reduxjs/toolkit";
import { cancelSale, createSale, getAllSales, getSaleById } from "./saleThunks";
import type { SaleState } from "./saleTypes";

const initialState: SaleState = {
	sales: [],
	sale: null,
	loading: false,
	error: null,
	page: 1,
	totalPages: 1,
	totalItems: 0,
	limit: 9,
	hasNext: false,
	hasPrev: false,
};

const saleSlice = createSlice({
	name: "sales",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//GET ALL SALES
			.addCase(getAllSales.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllSales.fulfilled, (state, action) => {
				state.loading = false;
				state.sales = action.payload.data;
				state.page = action.payload.page;
				state.totalPages = action.payload.totalPages;
				state.totalItems = action.payload.totalItems;
				state.hasNext = action.payload.hasNext;
				state.hasPrev = action.payload.hasPrev;
			})
			.addCase(getAllSales.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al obtener ventas";
			})
			//GET SALE BY ID
			.addCase(getSaleById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getSaleById.fulfilled, (state, action) => {
				state.loading = false;
				state.sale = action.payload;
			})
			.addCase(getSaleById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al obtener venta";
			})
			//CREATE SALE
			.addCase(createSale.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createSale.fulfilled, (state, action) => {
				state.loading = false;
				state.sales.unshift(action.payload.sale);
			})
			.addCase(createSale.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al crear venta";
			})
			//CANCEL SALE
			.addCase(cancelSale.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(cancelSale.fulfilled, (state, action) => {
				state.loading = false;
				state.sales = state.sales.map((s) =>
					s.id === action.payload.sale.id ? action.payload.sale : s,
				);
			})
			.addCase(cancelSale.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al cancelar venta";
			});
	},
});

export default saleSlice.reducer;
