export const fetchAllHivesSuccessReducer = (state, action) => {
  state.hives = action.payload;
};

export const fetchSingleHiveSuccessReducer = (state, action) => {
  state.singleHive = action.payload;
};

export const pendingReducer = (state) => {
  state.isLoading = true;
  state.error = null;
};

export const rejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.error.message;
};

export const fulfilledReducer = (state) => {
  state.isLoading = false;
  state.error = null;
};
