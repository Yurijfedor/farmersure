export const fetchAllHivesSuccessReducer = (state, action) => {
  state.hives = action.payload;
};

export const updateTaskReducer = (state, action) => {
  const { hiveId, updatedTask } = action.payload;
  const hive = state.hives.find((hive) => hive.id === hiveId);
  console.log(updatedTask);
  if (hive) {
    hive.tasks = hive.tasks.map((task) => {
      // Якщо ID завдання дорівнює ID оновленого завдання, повертаємо оновлене
      if (task.id === updatedTask.id) {
        return updatedTask; // Замінюємо старе завдання на нове
      }
      return task; // Інакше повертаємо старе завдання без змін
    });
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

export const updateHiveTasksReducer = (state, action) => {
  const { hiveId, newTasks } = action.payload; // Очікуємо об'єкт із ID вулика та новим масивом завдань
  const hive = state.hives.find((hive) => hive.id === hiveId);

  if (hive) {
    hive.tasks = newTasks; // Замінюємо весь масив завдань
  }
};

export const updateAgreeWithBasicTechReducer = (state, action) => {
  const { hiveId, value } = action.payload;
  const hive = state.hives.find((hive) => hive.id === hiveId);
  if (hive) {
    hive.agreeWithBasicTech = value;
  }
};

export const updateAdditionalServicesReducer = (state, action) => {
  const { hiveId, service, value } = action.payload;
  const hive = state.hives.find((hive) => hive.id === hiveId);
  if (hive) {
    hive.additionalServices[service] = value;
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
