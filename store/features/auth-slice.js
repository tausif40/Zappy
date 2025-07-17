import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";

// Login User
export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
	try {
		const response = await apiClient.post("/auth/login", credentials);
		return { status: response.status, data: response.data, };
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const registerUser = createAsyncThunk("auth/registerUser", async (formData, thunkAPI) => {
	try {
		const response = await apiClient.post("/auth/register-user", formData);
		return { status: response.status, data: response.data, };
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});

export const otpVerify = createAsyncThunk("auth/otpVerify", async (formData, thunkAPI) => {
	try {
		const response = await apiClient.post("/auth/verify-mobile-otp", formData);
		console.log(response);
		return { status: response.status, data: response.data, };
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});

const initialState = {
	user: [],
	isLoading: false,
	error: null
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//login
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	}
});

export default authSlice.reducer;
