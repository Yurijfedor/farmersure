import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { fetchAllHives } from "./operations";
import {
  fetchAllHivesSuccessReducer,
  pendingReducer,
  rejectedReducer,
  fulfilledReducer,
  updateTaskReducer,
  addTaskReducer,
  removeTaskReducer,
} from "./reducers";

const extraActions = [fetchAllHives];

const getActions = (type) => extraActions.map((action) => action[type]);

const hivesInitialState = {
  hives: [],
  isLoading: false,
  error: null,
};

const hivesSlice = createSlice({
  name: "hives",
  initialState: hivesInitialState,

  reducers: {
    updateTaskState: updateTaskReducer,
    addTaskToHive: addTaskReducer,
    removeTaskFromHive: removeTaskReducer,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHives.fulfilled, fetchAllHivesSuccessReducer)
      .addMatcher(isAnyOf(...getActions("pending")), pendingReducer)
      .addMatcher(isAnyOf(...getActions("rejected")), rejectedReducer)
      .addMatcher(isAnyOf(...getActions("fulfilled")), fulfilledReducer);
  },
});

export const { updateTaskState, addTaskToHive, removeTaskFromHive } =
  hivesSlice.actions;
export const hivesReducer = hivesSlice.reducer;
