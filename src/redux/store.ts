import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/category/categorySlice";
import productReducer from "./features/products/productSlice";

export const store = configureStore({
	reducer: {
		products: productReducer,
		categories: categoryReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
