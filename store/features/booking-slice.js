import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";

export const getBookingHistory = createAsyncThunk("order/getBookingHistory", async (_, thunkAPI) => {
	try {
		const response = await apiClient.get(`/orders`);
		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});

const initialState = {
	bookingHistory: { data: [], isLoading: false, error: null },
}

const bookingSlice = createSlice({
	name: "booking",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//birthdayEvent
			.addCase(getBookingHistory.pending, (state) => {
				state.bookingHistory.isLoading = true;
				state.bookingHistory.error = null;
			})
			.addCase(getBookingHistory.fulfilled, (state, action) => {
				state.bookingHistory.isLoading = false;
				state.bookingHistory.error = null;
				state.bookingHistory.data = action.payload;
			})
			.addCase(getBookingHistory.rejected, (state, action) => {
				state.bookingHistory.isLoading = false;
				state.bookingHistory.error = action.payload;
			})

	}
});

export default bookingSlice.reducer;
