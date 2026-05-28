import axios from "@api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "@utils/errorHandler";
import type {
	CreateProductData,
	DeleteProductResponse,
	GetProductsParams,
	GetProductsResponse,
	Product,
	ProductResponse,
	UpdateProductData,
} from "./productTypes";

export const getAllProducts = createAsyncThunk<
	GetProductsResponse,
	GetProductsParams,
	{ rejectValue: string }
>("products/getAllProducts", async (params, { rejectWithValue }) => {
	try {
		const response = await axios.get<GetProductsResponse>("/products", {
			params,
		});
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al obtener productos"),
		);
	}
});

export const getAllProductsNoPagination = createAsyncThunk<
	Product[],
	void,
	{ rejectValue: string }
>("products/getAllProductsNoPagination", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<Product[]>("/products/no-pagination");
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al obtener productos"),
		);
	}
});

export const getProductById = createAsyncThunk<
	Product,
	number,
	{ rejectValue: string }
>("products/getProductById", async (id, { rejectWithValue }) => {
	try {
		const response = await axios.get<Product>(`/products/${id}`);
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al obtener producto por ID"),
		);
	}
});

export const createProduct = createAsyncThunk<
	ProductResponse,
	CreateProductData,
	{ rejectValue: string }
>("products/createProduct", async (productData, { rejectWithValue }) => {
	try {
		const formData = new FormData();

		formData.append("name", productData.name);
		formData.append("price", productData.price.toString());
		formData.append("categoryId", String(productData.categoryId));
		if (productData.quantity !== undefined) {
			formData.append("quantity", String(productData.quantity));
		}
		if (productData.img) {
			formData.append("img", productData.img);
		}

		const response = await axios.post<ProductResponse>("/products", formData);
		return response.data;
	} catch (error) {
		return rejectWithValue(getErrorMessage(error, "Error al crear producto"));
	}
});

export const updateProduct = createAsyncThunk<
	ProductResponse,
	UpdateProductData,
	{ rejectValue: string }
>("products/updateProduct", async (productData, { rejectWithValue }) => {
	try {
		const formData = new FormData();

		formData.append("name", productData.name);
		formData.append("price", productData.price.toString());
		formData.append("categoryId", String(productData.categoryId));
		if (productData.img) {
			formData.append("img", productData.img);
		}

		const response = await axios.put<ProductResponse>(
			`/products/${productData.id}`,
			formData,
		);
		return response.data;
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al actualizar producto"),
		);
	}
});

export const deleteProduct = createAsyncThunk<
	DeleteProductResponse,
	number,
	{ rejectValue: string }
>("products/deleteProduct", async (id, { rejectWithValue }) => {
	try {
		const response = await axios.delete<DeleteProductResponse>(
			`/products/${id}`,
		);
		return {
			id,
			message: response.data.message,
		};
	} catch (error) {
		return rejectWithValue(
			getErrorMessage(error, "Error al eliminar producto"),
		);
	}
});
