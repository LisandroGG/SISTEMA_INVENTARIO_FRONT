import { createSlice } from "@reduxjs/toolkit";
import { getAllMovements } from "./movementThunks";
import type { MovementState } from "./movementTypes";

const initialState: MovementState = {
	movements: [],
	loading: false,
	error: null,
	page: 1,
	totalPages: 1,
	totalItems: 0,
	limit: 9,
	hasNext: false,
	hasPrev: false,
};

const movementSlice = createSlice({
	name: "movements",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//GET ALL MOVEMENTS
			.addCase(getAllMovements.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllMovements.fulfilled, (state, action) => {
				state.loading = false;

				state.movements = action.payload.data;
				state.page = action.payload.page;
				state.totalPages = action.payload.totalPages;
				state.totalItems = action.payload.totalItems;
				state.hasNext = action.payload.hasNext;
				state.hasPrev = action.payload.hasPrev;
			})
			.addCase(getAllMovements.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Error al obtener movimientos de stock";
			});
	},
});

export default movementSlice.reducer;
