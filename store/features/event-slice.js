import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";
import { getQueryParams } from "@/lib/utils";

// Login User
export const getBirthdayEvent = createAsyncThunk("event/getBirthDayEvent", async (filter, thunkAPI) => {
	try {
		console.log(`/birthday-events?${getQueryParams(filter)}`);

		const response = await apiClient.get(`/birthday-events?${getQueryParams(filter)}`);
		console.log(response);

		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
});

const initialState = {
	birthdayEvent: { data: [], isLoading: false, error: null },
	birthdayEventFilter: { city: '', priceRange: '', ageGroup: '', subCategory: '', page: '', limit: '', total: '' }
}

const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {
		setFilter: (state, action) => {
			const { city, priceRange, ageGroup, subCategory, page, limit, total } = action.payload
			state.city = city ?? ''
			state.priceRange = priceRange ?? '';
			state.ageGroup = ageGroup ?? '';
			state.subCategory = subCategory ?? '';
			state.page = page ?? '';
			state.limit = limit ?? '';
			state.total = total ?? '';
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
			});
	}
});

export const { setFilter } = eventSlice.actions
export default eventSlice.reducer;
