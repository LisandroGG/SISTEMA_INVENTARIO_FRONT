import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/category/categorySlice";
import movementReducer from "./features/movement/movementSlice";
import notificationReducer from "./features/notification/notificationSlice";
import productReducer from "./features/products/productSlice";
import saleReducer from "./features/sale/saleSlice";
import statsReducer from "./features/stats/statsSlice";
import stockReducer from "./features/stock/stockSlice";

export const store = configureStore({
	reducer: {
		products: productReducer,
		categories: categoryReducer,
		stocks: stockReducer,
		movements: movementReducer,
		notifications: notificationReducer,
		sales: saleReducer,
		stats: statsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
