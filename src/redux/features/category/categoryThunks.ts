import axios from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "@utils/errorHandler";
import type {
	Category,
	CategoryResponse,
	CreateCategoryData,
	DeleteCategoryResponse,
	GetCategoriesParams,
	GetCategoryResponse,
	UpdateCategoryData,
} from "./categoryTypes";

export const getAllCategories = createAsyncThunk<
	GetCategoryResponse,
	GetCategoriesParams,
	{ rejectValue: string }
>("categories/getAllCategories", async (params, { rejectWithValue }) => {
	try {
		const response = await axios.get<GetCategoryResponse>("/categories", {
			params,
		});
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al obtener categorias"),
		);
	}
});

export const getAllCategoriesNoPagination = createAsyncThunk<
	Category[],
	void,
	{ rejectValue: string }
>("categories/getAllCategoriesNoPagination", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<Category[]>("/categories/no-pagination");
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al obtener categorias"),
		);
	}
});

export const getCategoryById = createAsyncThunk<
	Category,
	number,
	{ rejectValue: string }
>("categories/getCategoryById", async (id, { rejectWithValue }) => {
	try {
		const response = await axios.get<Category>(`/categories/${id}`);
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al obtener categoria por ID"),
		);
	}
});

export const createCategory = createAsyncThunk<
	CategoryResponse,
	CreateCategoryData,
	{ rejectValue: string }
>("categories/createCategory", async (categoryData, { rejectWithValue }) => {
	try {
		const response = await axios.post<CategoryResponse>(
			"/categories",
			categoryData,
		);
		return response.data;
	} catch (error) {
		return rejectWithValue(getErrorMessage(error, "Error al crear categoria"));
	}
});

export const updateCategory = createAsyncThunk<
	CategoryResponse,
	UpdateCategoryData,
	{ rejectValue: string }
>("categories/updateCategory", async (categoryData, { rejectWithValue }) => {
	try {
		const response = await axios.put<CategoryResponse>(
			`/categories/${categoryData.id}`,
			categoryData,
		);
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al actualizar categoria"),
		);
	}
});

export const deleteCategory = createAsyncThunk<
	DeleteCategoryResponse,
	number,
	{ rejectValue: string }
>("categories/deleteCategory", async (id, { rejectWithValue }) => {
	try {
		const response = await axios.delete<DeleteCategoryResponse>(
			`/categories/${id}`,
		);
		return {
			id,
			message: response.data.message,
		};
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al eliminar categoria"),
		);
	}
});
