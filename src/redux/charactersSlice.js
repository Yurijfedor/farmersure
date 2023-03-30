import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchAllCharacters, fetchSingleCharacter } from "./operations";
import {
  fetchAllCharactersSuccessReducer,
  fetchSingleCharacterSuccessReducer,
  pendingReducer,
  rejectedReducer,
  fulfilledReducer,
} from "./reducers";

const extraActions = [fetchAllCharacters, fetchSingleCharacter];

const getActions = (type) => extraActions.map((action) => action[type]);

const charactersInitialState = {
  characters: [],
  singleCharacter: null,
  isLoading: false,
  error: null,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState: charactersInitialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCharacters.fulfilled, fetchAllCharactersSuccessReducer)
      .addCase(
        fetchSingleCharacter.fulfilled,
        fetchSingleCharacterSuccessReducer
      )
      .addMatcher(isAnyOf(...getActions("pending")), pendingReducer)
      .addMatcher(isAnyOf(...getActions("rejected")), rejectedReducer)
      .addMatcher(isAnyOf(...getActions("fulfilled")), fulfilledReducer);
  },
});

export const charactersReducer = charactersSlice.reducer;
