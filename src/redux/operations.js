import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://rickandmortyapi.com/api";

export const fetchAllCharacters = createAsyncThunk(
  "characters/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/character");
      return response.data.results;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchSingleCharacter = createAsyncThunk(
  "characters/fetchSingle",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/character/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
