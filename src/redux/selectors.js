import { createSelector } from "@reduxjs/toolkit";

export const selectCharacters = (state) => state.characters.characters;
export const selectSingleCharacter = (state) =>
  state.characters.singleCharacter;
export const selectFilterValue = (state) => state.filter.filterValue;
export const selectUser = (state) => state.user;
export const selectIsLoading = (state) => state.characters.isLoading;
export const selectError = (state) => state.characters.error;

export const selectVisibleCharacters = createSelector(
  [selectCharacters, selectFilterValue],
  (characters, filters) => {
    return filters
      ? characters.filter((character) =>
          character.name.toLowerCase().includes(filters.toLowerCase())
        )
      : characters;
  }
);
