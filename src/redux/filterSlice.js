import { createSlice } from "@reduxjs/toolkit";

const filterInitialState = {
  filterValue: "",
};

const filtersSlice = createSlice({
  name: "filter",
  initialState: filterInitialState,
  reducers: {
    setFilterValue(state, action) {
      state.filterValue = action.payload;
    },
  },
});

export const { setFilterValue } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
