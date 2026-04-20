import axios from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
	Category,
	CategoryResponse,
	CreateCategoryData,
	DeleteCategoryResponse,
	UpdateCategoryData,
} from "./categoryTypes";

export const getAllCategories = createAsyncThunk<
	Category[],
	void,
	{ rejectValue: string }
>("category/getAllCategories", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<Category[]>("/category");
		return response.data;
	} catch (_error) {
		return rejectWithValue("Error al obtener categorias");
	}
});

export const getCategoryById = createAsyncThunk<
	Category,
	number,
	{ rejectValue: string }
>("category/getCategoryById", async (id, { rejectWithValue }) => {
	try {
		const response = await axios.get<Category>(`/category/${id}`);
		return response.data;
	} catch (_error) {
		return rejectWithValue("Error al obtener categoria por ID");
	}
});

export const createCategory = createAsyncThunk<
	CategoryResponse,
	CreateCategoryData,
	{ rejectValue: string }
>("category/createCategory", async (categoryData, { rejectWithValue }) => {
	try {
		const response = await axios.post<CategoryResponse>(
			"/category",
			categoryData,
		);
		return response.data;
	} catch (_error) {
		return rejectWithValue("Error al crear categoria");
	}
});

export const updateCategory = createAsyncThunk<
	CategoryResponse,
	UpdateCategoryData,
	{ rejectValue: string }
>("category/updateCategory", async (categoryData, { rejectWithValue }) => {
	try {
		const response = await axios.put<CategoryResponse>(
			`/category/${categoryData.id}`,
			categoryData,
		);
		return response.data;
	} catch (_error) {
		return rejectWithValue("Error al actualizar categoria");
	}
});

export const deleteCategory = createAsyncThunk<
	DeleteCategoryResponse,
	number,
	{ rejectValue: string }
>("category/deleteCategory", async (id, { rejectWithValue }) => {
	try {
		const response = await axios.delete<DeleteCategoryResponse>(
			`/category/${id}`,
		);
		return {
			id,
			message: response.data.message,
		};
	} catch (_error) {
		return rejectWithValue("Error al eliminar categoria");
	}
});
