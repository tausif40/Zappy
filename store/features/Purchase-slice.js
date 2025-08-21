import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";

export const addToCart = createAsyncThunk("purchase/addToCart", async (data, thunkAPI) => {
	try {
		const response = await apiClient.post("/cart/items", data);
		// console.log(response);
		if (response.status === 200) {
			thunkAPI.dispatch(getToCart());
		}
		return { status: response.status, data: response.data, };
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});
export const UpdateToCart = createAsyncThunk("purchase/UpdateToCart", async (data, thunkAPI) => {
	try {
		const response = await apiClient.patch(`/cart/items/${id}`, data);
		// console.log(response);
		if (response.status === 200) {
			thunkAPI.dispatch(getToCart());
		}
		return { status: response.status, data: response.data, };
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});
export const getToCart = createAsyncThunk("purchase/getToCart", async (bookingId, thunkAPI) => {
	try {
		const response = await apiClient.get(`/cart/items/${bookingId}`);
		// console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});
export const updateToCart = createAsyncThunk("purchase/getToCart", async (data, thunkAPI) => {
	try {
		console.log("final submit:", data);
		const response = await apiClient.patch(`/cart/items/${data.bookingId}`, data.addOnIds);
		console.log(response);
		return { status: response.status, data: response.data, };
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});
export const addAddresses = createAsyncThunk("purchase/addAddresses", async (addresses, thunkAPI) => {
	try {
		const response = await apiClient.post(`/users/me/addresses`, addresses);
		// console.log(response);
		if (response.status === 201) thunkAPI.dispatch(getAddresses())
		return { status: response.status, data: response.data, };
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});
export const getAddresses = createAsyncThunk("purchase/getAddresses", async (addresses, thunkAPI) => {
	try {
		const response = await apiClient.get(`/users/me/addresses`, addresses);
		// console.log(response);
		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});
export const deleteAddresses = createAsyncThunk("purchase/getAddresses", async (id, thunkAPI) => {
	try {
		const response = await apiClient.delete(`/users/me/addresses/${id}`);
		if (response.status === 200) thunkAPI.dispatch(getAddresses())
		return { status: response.status, data: response.data, };
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});
export const order = createAsyncThunk("purchase/getAddresses", async (data, thunkAPI) => {
	try {
		const response = await apiClient.post(`/orders`, data);
		console.log(response);
		return { status: response.status, data: response.data, };
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});

const initialState = {
	cartItem: { data: [], isLoading: false, error: null },
	bookingFlow: { data: [], isLoading: false, error: null },
	addresses: { data: [], isLoading: false, error: null },
};

const purchaseSlice = createSlice({
	name: "purchase",
	initialState,
	reducers: {
		// setBookingFlow: (state, action) => {
		// 	console.log(action);
		// 	const isEmpty = (value) => value == null || (Array.isArray(value) && value.length === 0);
		// 	const updatedBookingFlow = { ...state.bookingFlow, ...action.payload };
		// 	Object.keys(updatedBookingFlow).forEach((key) => {
		// 		if (isEmpty(updatedBookingFlow[ key ])) {
		// 			delete updatedBookingFlow[ key ];
		// 		}
		// 	});
		// 	state.bookingFlow = updatedBookingFlow;
		// }
	},
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
			// addCategory
			.addCase(getToCart.pending, (state) => {
				state.bookingFlow.isLoading = true;
				state.bookingFlow.error = null;
			})
			.addCase(getToCart.fulfilled, (state, action) => {
				state.bookingFlow.isLoading = false;
				state.bookingFlow.error = null;
				state.bookingFlow.data = action.payload;
			})
			.addCase(getToCart.rejected, (state, action) => {
				state.bookingFlow.isLoading = false;
				state.bookingFlow.error = action.payload;
			})
			// addresses
			.addCase(getAddresses.pending, (state) => {
				state.addresses.isLoading = true;
				state.addresses.error = null;
			})
			.addCase(getAddresses.fulfilled, (state, action) => {
				state.addresses.isLoading = false;
				state.addresses.error = null;
				state.addresses.data = action.payload;
			})
			.addCase(getAddresses.rejected, (state, action) => {
				state.addresses.isLoading = false;
				state.addresses.error = action.payload;
			})
	}
});

export const { setBookingFlow } = purchaseSlice.actions;
export default purchaseSlice.reducer;
