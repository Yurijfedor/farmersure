import { createAsyncThunk } from "@reduxjs/toolkit";

import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import axios from "axios";

import db from "../firebase";

axios.defaults.baseURL = "https://rickandmortyapi.com/api";

export const fetchAllHives = createAsyncThunk(
  "hives/fetchAll",
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, "hives"));
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

export const fetchHiveById = createAsyncThunk(
  "hives/fetchById",
  async (hiveId, thunkAPI) => {
    try {
      const docRef = doc(db, "hives", hiveId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      } else {
        return thunkAPI.rejectWithValue("Hive not found");
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
