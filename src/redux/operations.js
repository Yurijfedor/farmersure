import { createAsyncThunk } from '@reduxjs/toolkit';

import { collection, getDocs } from 'firebase/firestore';
import axios from 'axios';

import db from '../firebase';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api';

export const fetchAllHives = createAsyncThunk(
  'hives/fetchAll',
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'hives'));
      const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return result;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchSingleHive = createAsyncThunk(
  'hives/fetchSingle',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/hive/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
