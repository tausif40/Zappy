import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";

export const addToCart = createAsyncThunk("purchase/addToCart", async (data, thunkAPI) => {
	try {
		const response = await apiClient.post("/cart/items", data);
		console.log(response);
		return { status: response.status, data: response.data, };
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});

const initialState = {
	cartItem: { data: [], isLoading: false, error: null },
};

const purchaseSlice = createSlice({
	name: "purchase",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// addCategory
			.addCase(addToCart.pending, (state) => {
				state.cartItem.isLoading = true;
				state.cartItem.error = null;
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				state.cartItem.isLoading = false;
				state.cartItem.error = null;
				state.cartItem.data = action.payload;
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.cartItem.isLoading = false;
				state.cartItem.error = action.payload;
			})
	}
});

export default purchaseSlice.reducer;
