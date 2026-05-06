import { createSlice } from "@reduxjs/toolkit";
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getAllCategoriesNoPagination,
	getCategoryById,
	updateCategory,
} from "./categoryThunks";
import type { CategoryState } from "./categoryTypes";

const initialState: CategoryState = {
	categories: [],
	category: null,
	loading: false,
	error: null,
	page: 1,
	totalPages: 1,
	totalItems: 0,
	limit: 9,
	hasNext: false,
	hasPrev: false,
};

const categorySlice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//GET ALL CATEGORIES
			.addCase(getAllCategories.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = action.payload.data;
				state.page = action.payload.page;
				state.totalPages = action.payload.totalPages;
				state.totalItems = action.payload.totalItems;
				state.hasNext = action.payload.hasNext;
				state.hasPrev = action.payload.hasPrev;
			})
			.addCase(getAllCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al obtener categorias";
			})
			//GET ALL CATEGORIES NO PAGINATION
			.addCase(getAllCategoriesNoPagination.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllCategoriesNoPagination.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = action.payload;
			})
			.addCase(getAllCategoriesNoPagination.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al obtener categorias";
			})
			//GET CATEGORY BY ID
			.addCase(getCategoryById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getCategoryById.fulfilled, (state, action) => {
				state.loading = false;
				state.category = action.payload;
			})
			.addCase(getCategoryById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al obtener categoria";
			})
			//CREATE CATEGORY
			.addCase(createCategory.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.categories.unshift(action.payload.category);
			})
			.addCase(createCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al crear categoria";
			})
			//UPDATE CATEGORY
			.addCase(updateCategory.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCategory.fulfilled, (state, action) => {
				state.loading = false;
				const updated = action.payload.category;

				const index = state.categories.findIndex((c) => c.id === updated.id);

				if (index !== -1) {
					state.categories[index] = updated;
				}
				if (state.category?.id === updated.id) {
					state.category = updated;
				}
			})
			.addCase(updateCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al actualizar categoria";
			})
			//DELETE CATEGORY
			.addCase(deleteCategory.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				state.loading = false;

				state.categories = state.categories.filter(
					(c) => c.id !== action.payload.id,
				);

				if (state.category?.id === action.payload.id) {
					state.category = null;
				}
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al eliminar categoria";
			});
	},
});

export default categorySlice.reducer;
