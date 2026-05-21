import { createSlice } from "@reduxjs/toolkit";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getAllProductsNoPagination,
	getProductById,
	updateProduct,
} from "./productThunks";
import type { ProductState } from "./productTypes";

const initialState: ProductState = {
	products: [],
	product: null,
	loading: false,
	error: null,
	page: 1,
	totalPages: 1,
	totalItems: 0,
	limit: 10,
	hasNext: false,
	hasPrev: false,
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//GET ALL PRODUCTS
			.addCase(getAllProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllProducts.fulfilled, (state, action) => {
				state.loading = false;

				state.products = action.payload.data;
				state.page = action.payload.page;
				state.totalPages = action.payload.totalPages;
				state.totalItems = action.payload.totalItems;
				state.hasNext = action.payload.hasNext;
				state.hasPrev = action.payload.hasPrev;
			})
			.addCase(getAllProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al obtener productos";
			})
			//GET ALL PRODUCTS NO PAGINATION
			.addCase(getAllProductsNoPagination.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllProductsNoPagination.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(getAllProductsNoPagination.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al obtener productos";
			})
			//GET PRODUCT BY ID
			.addCase(getProductById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getProductById.fulfilled, (state, action) => {
				state.loading = false;
				state.product = action.payload;
			})
			.addCase(getProductById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al obtener producto";
			})
			//CREATE PRODUCT
			.addCase(createProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products.unshift(action.payload.product);
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al crear producto";
			})
			//UPDATE PRODUCT
			.addCase(updateProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.loading = false;

				const updated = action.payload.product;
				const index = state.products.findIndex((p) => p.id === updated.id);

				if (index !== -1) {
					state.products[index] = updated;
				}
				if (state.product?.id === updated.id) {
					state.product = updated;
				}
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al actualizar producto";
			})
			//DELETE PRODUCT
			.addCase(deleteProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.loading = false;

				state.products = state.products.filter(
					(p) => p.id !== action.payload.id,
				);

				if (state.product?.id === action.payload.id) {
					state.product = null;
				}
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al eliminar producto";
			});
	},
});

export default productSlice.reducer;
