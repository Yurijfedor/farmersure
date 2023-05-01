import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { fetchAllHives, fetchSingleHive } from './operations';
import {
  fetchAllHivesSuccessReducer,
  fetchSingleHiveSuccessReducer,
  pendingReducer,
  rejectedReducer,
  fulfilledReducer,
} from './reducers';

const extraActions = [fetchAllHives, fetchSingleHive];

const getActions = (type) => extraActions.map((action) => action[type]);

const hivesInitialState = {
  hives: [],
  singlehive: null,
  isLoading: false,
  error: null,
};

const hivesSlice = createSlice({
  name: 'hives',
  initialState: hivesInitialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHives.fulfilled, fetchAllHivesSuccessReducer)
      .addCase(fetchSingleHive.fulfilled, fetchSingleHiveSuccessReducer)
      .addMatcher(isAnyOf(...getActions('pending')), pendingReducer)
      .addMatcher(isAnyOf(...getActions('rejected')), rejectedReducer)
      .addMatcher(isAnyOf(...getActions('fulfilled')), fulfilledReducer);
  },
});

export const hivesReducer = hivesSlice.reducer;
