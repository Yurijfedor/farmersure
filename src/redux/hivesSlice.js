import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { fetchAllHives, updateTaskStatusAsync } from "./operations";
import {
  fetchAllHivesSuccessReducer,
  pendingReducer,
  rejectedReducer,
  fulfilledReducer,
  updateTaskReducer,
  addTaskReducer,
  removeTaskReducer,
} from "./reducers";

const extraActions = [fetchAllHives, updateTaskStatusAsync]; // Додаємо async action

const getActions = (type) => extraActions.map((action) => action[type]);

const hivesInitialState = {
  hives: [],
  isLoading: false,
  error: null,
};

const hivesSlice = createSlice({
  name: "hives",
  initialState: hivesInitialState,

  reducers: {
    updateTasksStatus: updateTaskReducer,
    addTaskToHive: addTaskReducer,
    removeTaskFromHive: removeTaskReducer,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHives.fulfilled, fetchAllHivesSuccessReducer)
      .addCase(updateTaskStatusAsync.fulfilled, (state, action) => {
        // Знаходимо вулик і оновлюємо статус завдання у стані Redux
        const { hiveId, updatedTask } = action.payload;
        const hive = state.hives.find((hive) => hive.id === hiveId);

        if (hive) {
          const taskIndex = hive.tasks.findIndex(
            (task) => task.id === updatedTask.id
          );
          if (taskIndex !== -1) {
            hive.tasks[taskIndex] = updatedTask;
          }
        }
      })
      .addMatcher(isAnyOf(...getActions("pending")), pendingReducer)
      .addMatcher(isAnyOf(...getActions("rejected")), rejectedReducer)
      .addMatcher(isAnyOf(...getActions("fulfilled")), fulfilledReducer);
  },
});

export const { updateTasksStatus, addTaskToHive, removeTaskFromHive } =
  hivesSlice.actions;
export const hivesReducer = hivesSlice.reducer;
