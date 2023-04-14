import { createSelector } from "@reduxjs/toolkit";

export const selectHives = (state) => state.hives.hives;
export const selectSingleHive = (state) => state.hives.singleHive;
export const selectFilterValue = (state) => state.filter.filterValue;
export const selectUser = (state) => state.user;
export const selectIsLoading = (state) => state.characters.isLoading;
export const selectError = (state) => state.characters.error;

export const selectVisibleHives = createSelector(
  [selectHives, selectFilterValue],
  (hives, filters) => {
    return filters
      ? hives.filter((hive) =>
          hive.name.toLowerCase().includes(filters.toLowerCase())
        )
      : hives;
  }
);
