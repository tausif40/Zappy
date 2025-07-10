import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";

export const registerVendor = createAsyncThunk("auth/registerVendor", async (formData, thunkAPI) => {
	try {
		const response = await apiClient.post("/auth/register-vendor", formData);
		return { status: response.status, data: response.data, };
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});

const initialState = {
	vendor: [],
	isLoading: false,
	error: null
};

const registerVendorSlice = createSlice({
	name: "registerVendor",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
		//registerVendor

	}
});

export default registerVendorSlice.reducer;
