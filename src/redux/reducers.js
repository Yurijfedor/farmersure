export const fetchAllCharactersSuccessReducer = (state, action) => {
  state.characters = action.payload.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
};

export const fetchSingleCharacterSuccessReducer = (state, action) => {
  state.singleCharacter = action.payload;
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
