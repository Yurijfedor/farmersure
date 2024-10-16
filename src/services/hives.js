import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

import db from "../firebase";

export const fetchAllHives = async () => {
  const querySnapshot = await getDocs(collection(db, "hives"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const fetchHiveById = async ({ hiveId }) => {
  if (typeof hiveId !== "string") {
    throw new Error("Invalid hive ID");
  }
  const docRef = doc(db, "hives", hiveId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } else {
    throw new Error("Hive not found");
  }
};

export const updateHiveTasks = async ({ hiveId, tasks }) => {
  const hiveDocRef = doc(db, "hives", hiveId);
  await updateDoc(hiveDocRef, { tasks }); // Оновлюємо або додаємо поле tasks
};

export const deleteHiveTask = async ({ hiveId, tasks }) => {
  const hiveDocRef = doc(db, "hives", hiveId);
  await updateDoc(hiveDocRef, { tasks }); // Оновлюємо або видаляємо завдання з масиву tasks
};

// Функція для додавання завдання в колекцію для підтвердження
export const addTaskToConfirmationCollection = async (task) => {
  console.log(task);
  const confirmationCollection = collection(db, "tasksForConfirmation");
  const taskDocRef = doc(confirmationCollection, task.id); // посилання на документ за id завдання

  // Перевірка, чи завдання вже існує
  const taskSnapshot = await getDoc(taskDocRef);
  if (!taskSnapshot.exists()) {
    // Якщо завдання ще немає, додаємо його
    await setDoc(taskDocRef, task);
  } else {
    console.log(
      `Task with ID ${task.id} already exists in the confirmation collection`
    );
  }
};
