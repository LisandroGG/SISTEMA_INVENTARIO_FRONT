import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/category/categorySlice";
import movementReducer from "./features/movement/movementSlice";
import productReducer from "./features/products/productSlice";
import stockReducer from "./features/stock/stockSlice";

export const store = configureStore({
	reducer: {
		products: productReducer,
		categories: categoryReducer,
		stocks: stockReducer,
		movements: movementReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
