import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  fetchAllHives,
  updateTaskStatusAsync,
  updateAgreeWithBasicTech,
  updateAdditionalService,
} from "./operations";
import {
  fetchAllHivesSuccessReducer,
  pendingReducer,
  rejectedReducer,
  fulfilledReducer,
  updateTaskReducer,
  addTaskReducer,
  removeTaskReducer,
  updateHiveTasksReducer,
} from "./reducers";

const extraActions = [fetchAllHives, updateTaskStatusAsync]; // Додаємо async action

const getActions = (type) => extraActions.map((action) => action[type]);

const hivesInitialState = {
  hives: [],
  filteredTasks: [],
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
    updateHiveTasks: updateHiveTasksReducer,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHives.fulfilled, fetchAllHivesSuccessReducer)
      .addCase(updateTaskStatusAsync.fulfilled, (state, action) => {
        const { hiveId, updatedTask } = action.payload;
        const hive = state.hives.find((hive) => hive.id === hiveId);

        if (hive) {
          const taskIndex = hive.tasks.findIndex(
            (task) => task.id === updatedTask.id
          );
          if (taskIndex !== -1) {
            // Створюємо новий масив завдань з оновленим завданням
            hive.tasks = [
              ...hive.tasks.slice(0, taskIndex),
              updatedTask,
              ...hive.tasks.slice(taskIndex + 1),
            ];
          }
        }
      })
      .addCase(updateAgreeWithBasicTech.fulfilled, (state, action) => {
        const { hiveId, value } = action.payload;
        const hive = state.hives.find((hive) => hive.id === hiveId);
        if (hive) {
          hive.agreeWithBasicTech = value;
        }
      })
      .addCase(updateAdditionalService.fulfilled, (state, action) => {
        const { hiveId, service, value } = action.payload;
        const hive = state.hives.find((hive) => hive.id === hiveId);
        if (hive) {
          hive.additionalServices[service] = value;
        }
      })
      .addMatcher(isAnyOf(...getActions("pending")), pendingReducer)
      .addMatcher(isAnyOf(...getActions("rejected")), rejectedReducer)
      .addMatcher(isAnyOf(...getActions("fulfilled")), fulfilledReducer);
  },
});

export const {
  updateTasksStatus,
  addTaskToHive,
  removeTaskFromHive,
  updateHiveTasks,
} = hivesSlice.actions;
export const hivesReducer = hivesSlice.reducer;
