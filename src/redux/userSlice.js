import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { fetchUserProfile, saveProfile, updateProfile } from "./operations"; // Імпорт операцій
import { pendingReducer, rejectedReducer, fulfilledReducer } from "./reducers";

const extraActions = [fetchUserProfile, saveProfile, updateProfile];

const getActions = (type) => extraActions.map((action) => action[type]);

const userInitialState = {
  profile: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,

  reducers: {
    setUserProfile(state, action) {
      state.profile = action.payload;
    },
    clearUserProfile(state) {
      state.profile = null;
    },
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Обробка успішного отримання профілю
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      // Обробка успішного збереження або оновлення профілю
      .addMatcher(
        isAnyOf(saveProfile.fulfilled, updateProfile.fulfilled),
        (state, action) => {
          state.profile = { ...state.profile, ...action.payload };
          state.isLoading = false;
          state.error = null;
        }
      )
      // Обробка pending і rejected для всіх асинхронних дій
      .addMatcher(isAnyOf(...getActions("pending")), pendingReducer)
      .addMatcher(isAnyOf(...getActions("rejected")), rejectedReducer)
      .addMatcher(isAnyOf(...getActions("fulfilled")), fulfilledReducer);
  },
});

export const { clearError, setUserProfile, clearUserProfile } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
