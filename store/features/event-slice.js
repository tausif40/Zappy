import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";
import { getQueryParams } from "@/lib/utils";


export const getBirthdayEvent = createAsyncThunk("event/getBirthDayEvent", async (birthdayFilter, thunkAPI) => {
	try {
		console.log(`/birthday-events?${getQueryParams(birthdayFilter)}`);

		const response = await apiClient.get(`/birthday-events?${getQueryParams(birthdayFilter)}`);
		console.log(response);

		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});
export const getBirthdayEventDetails = createAsyncThunk("event/getBirthdayEventDetails", async (id, thunkAPI) => {
	try {
		const response = await apiClient.get(`/birthday-events/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});

const initialState = {
	birthdayEvent: { data: [], isLoading: false, error: null },
	birthdayEventDetails: { data: [], isLoading: false, error: null },
	birthdayEventFilter: { city: '', priceRange: '', ageGroup: '', subCategory: '', page: '', limit: '', total: '' }
}

const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {
		setFilter: (state, action) => {
			console.log('action:', action)
			const { city, priceRange, ageGroup, subCategory, page, limit, total } = action.payload
			state.birthdayEventFilter.city = city ?? state.birthdayEventFilter.city
			state.birthdayEventFilter.priceRange = priceRange ?? state.birthdayEventFilter.priceRange;
			state.birthdayEventFilter.ageGroup = ageGroup ?? state.birthdayEventFilter.ageGroup;
			state.birthdayEventFilter.subCategory = subCategory ?? state.birthdayEventFilter.subCategory;
			state.birthdayEventFilter.page = page ?? state.birthdayEventFilter.page;
			state.birthdayEventFilter.limit = limit ?? state.birthdayEventFilter.limit;
			state.birthdayEventFilter.total = total ?? state.birthdayEventFilter.total;
		}
	},
	extraReducers: (builder) => {
		builder
			//birthdayEvent
			.addCase(getBirthdayEvent.pending, (state) => {
				state.birthdayEvent.isLoading = true;
				state.birthdayEvent.error = null;
			})
			.addCase(getBirthdayEvent.fulfilled, (state, action) => {
				state.birthdayEvent.isLoading = false;
				state.birthdayEvent.error = null;
				state.birthdayEvent.data = action.payload;
			})
			.addCase(getBirthdayEvent.rejected, (state, action) => {
				state.birthdayEvent.isLoading = false;
				state.birthdayEvent.error = action.payload;
			})
			//birthday Event Details
			.addCase(getBirthdayEventDetails.pending, (state) => {
				state.birthdayEventDetails.isLoading = true;
				state.birthdayEventDetails.error = null;
			})
			.addCase(getBirthdayEventDetails.fulfilled, (state, action) => {
				state.birthdayEventDetails.isLoading = false;
				state.birthdayEventDetails.error = null;
				state.birthdayEventDetails.data = action.payload;
			})
			.addCase(getBirthdayEventDetails.rejected, (state, action) => {
				state.birthdayEventDetails.isLoading = false;
				state.birthdayEventDetails.error = action.payload;
			});
	}
});

export const { setFilter } = eventSlice.actions
export default eventSlice.reducer;
