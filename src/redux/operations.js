import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  getUserProfile,
  saveUserProfile,
  updateUserProfile,
} from "../services/user";

import db from "../firebase";

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
        const result = {
          id: docSnap.id,
          ...docSnap.data(),
        };
        console.log(result);

        return result;
      } else {
        return thunkAPI.rejectWithValue("Hive not found");
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateTaskStatusAsync = createAsyncThunk(
  "hives/updateTaskStatus",
  async ({ hiveId, taskId, property, newValue }, { rejectWithValue }) => {
    try {
      // Отримуємо документ вулика з Firestore
      const hiveRef = doc(db, "hives", hiveId);
      const currentHiveData = await getDoc(hiveRef);

      if (!currentHiveData.exists()) {
        throw new Error(`Hive with ID ${hiveId} not found`);
      }

      const tasks = currentHiveData.data().tasks || [];

      // Оновлюємо конкретне завдання в масиві
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, [property]: newValue } : task
      );
      console.log(newValue);
      console.log(updatedTasks);

      // Оновлюємо документ вулика з новим масивом завдань
      await updateDoc(hiveRef, { tasks: updatedTasks });

      // Повертаємо оновлене завдання для використання у fulfilled reducer
      return {
        hiveId,
        updatedTask: updatedTasks.find((task) => task.id === taskId),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateHiveProperty = createAsyncThunk(
  "hives/updateHiveProperty",
  async ({ hiveId, property, value }, thunkAPI) => {
    try {
      const docRef = doc(db, "hives", hiveId);
      await updateDoc(docRef, {
        [property !== "lessee" ? property : `${property}.uid`]: value,
      }); // Оновлюємо властивість за допомогою динамічного ключа

      return { hiveId, property, value }; // Повертаємо значення для подальшого використання
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message); // Якщо сталася помилка
    }
  }
);

export const updateAgreeWithBasicTech = createAsyncThunk(
  "hives/updateAgreeWithBasicTech",
  async ({ hiveId, value }, thunkAPI) => {
    try {
      const docRef = doc(db, "hives", hiveId);
      await updateDoc(docRef, { agreeWithBasicTech: value });

      return { hiveId, value };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateAdditionalService = createAsyncThunk(
  "hives/updateAdditionalService",
  async ({ hiveId, service, value }, thunkAPI) => {
    try {
      const docRef = doc(db, "hives", hiveId);
      const fieldToUpdate = `additionalServices.${service}`;
      await updateDoc(docRef, { [fieldToUpdate]: value });

      return { hiveId, service, value };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const profile = await getUserProfile(userId);
      return profile;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to save user profile
export const saveProfile = createAsyncThunk(
  "user/saveProfile",
  async ({ uid, data }, { rejectWithValue }) => {
    try {
      await saveUserProfile(uid, data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update user profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ uid, data }, { rejectWithValue }) => {
    try {
      await updateUserProfile(uid, data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
