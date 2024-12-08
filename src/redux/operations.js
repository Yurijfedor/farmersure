import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import db from "../firebase";

import { updateTasksStatus } from "./hivesSlice";

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
