import { createSlice } from "@reduxjs/toolkit";
import { getDashboardStats } from "./statsThunks";
import type { statsState } from "./statsType";

const initialState: statsState = {
	stats: null,
	loading: false,
};

const statsSlice = createSlice({
	name: "stats",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getDashboardStats.pending, (state) => {
				state.loading = true;
			})
			.addCase(getDashboardStats.fulfilled, (state, action) => {
				state.loading = false;
				state.stats = action.payload;
			})
			.addCase(getDashboardStats.rejected, (state) => {
				state.loading = false;
			});
	},
});

export default statsSlice.reducer;
