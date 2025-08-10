import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";

export const getCategory = createAsyncThunk("event/getCategory", async (_, thunkAPI) => {
	try {
		const response = await apiClient.get("/categories");
		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});
export const getAddons = createAsyncThunk("event/getAddons", async (_, thunkAPI) => {
	try {
		const response = await apiClient.get("/addons");
		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});

const initialState = {
	category: { data: [], isLoading: false, error: null },
	addons: { data: [], isLoading: false, error: null },
};

const addOnsSlice = createSlice({
	name: "addOns",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// addCategory
			.addCase(getCategory.pending, (state) => {
				state.category.isLoading = true;
				state.category.error = null;
			})
			.addCase(getCategory.fulfilled, (state, action) => {
				state.category.isLoading = false;
				state.category.error = null;
				state.category.data = action.payload;
			})
			.addCase(getCategory.rejected, (state, action) => {
				state.category.isLoading = false;
				state.category.error = action.payload;
			})
			// getAddons
			.addCase(getAddons.pending, (state) => {
				state.addons.isLoading = true;
				state.addons.error = null;
			})
			.addCase(getAddons.fulfilled, (state, action) => {
				state.addons.isLoading = false;
				state.addons.error = null;
				state.addons.data = action.payload;
			})
			.addCase(getAddons.rejected, (state, action) => {
				state.addons.isLoading = false;
				state.addons.error = action.payload;
			})
	}
});

export default addOnsSlice.reducer;
