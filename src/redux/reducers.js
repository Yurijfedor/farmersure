export const fetchAllHivesSuccessReducer = (state, action) => {
  state.hives = action.payload;
};

export const updateTaskReducer = (state, action) => {
  const { hiveId, updatedTask } = action.payload;
  const hive = state.hives.find((hive) => hive.id === hiveId);

  if (hive) {
    hive.tasks = updatedTask; // Оновлення завдання в state
  }
};

export const addTaskReducer = (state, action) => {
  const { hiveId, newTask } = action.payload;
  const hive = state.hives.find((hive) => hive.id === hiveId);

  if (hive) {
    hive.tasks = [...hive.tasks, newTask]; // Додаємо нове завдання до масиву завдань
  }
};

export const removeTaskReducer = (state, action) => {
  const { hiveId, taskId } = action.payload;
  const hive = state.hives.find((hive) => hive.id === hiveId);
  if (hive) {
    hive.tasks = hive.tasks.filter((task) => task.id !== taskId);
  }
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
