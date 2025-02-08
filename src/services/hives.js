import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";

import db from "../firebase";

import { updateHive } from "../redux/hivesSlice";

export const fetchAllHives = async () => {
  const querySnapshot = await getDocs(collection(db, "hives"));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
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

export const updateTaskStatus = async ({ hiveId, taskId, newStatus }) => {
  console.log(hiveId);
  console.log(taskId);
  console.log(newStatus);

  // Отримуємо посилання на документ вулика
  const hiveRef = doc(db, "hives", hiveId);

  // Завантажуємо поточні дані завдань через getDoc()
  const currentHiveData = await getDoc(hiveRef);

  if (!currentHiveData.exists()) {
    throw new Error(`Hive with ID ${hiveId} not found`);
  }

  const tasks = currentHiveData.data().tasks || [];

  // Оновлюємо конкретне завдання в масиві, переконуючись, що немає undefined
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        status: newStatus ?? task.status, // Використовуємо nullish operator, щоб уникнути undefined
        date: task.date ?? null, // Переконуємося, що значення date не є undefined
        cost: task.cost ?? 0, // Установлюємо дефолтне значення для вартості
        duration: task.duration ?? 0, // Установлюємо дефолтне значення для тривалості
        executor: task.executor ?? "Unknown", // Установлюємо дефолтне значення для виконавця
      };
    }
    return task;
  });

  // Оновлюємо документ вулика з новим масивом tasks, перевіряючи, що кожне поле має допустиме значення
  await updateDoc(hiveRef, {
    tasks: updatedTasks,
  });
};

export const addSingleTask = async ({ hiveId, task }) => {
  const hiveDocRef = doc(db, "hives", hiveId);
  await updateDoc(hiveDocRef, { tasks: arrayUnion(task) }); // Оновлюємо або додаємо поле tasks
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

export const checkBeehiveRentals = async () => {
  // Прибираємо dispatch з аргументів
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Скидаємо час

  const beehivesRef = collection(db, "hives");
  const querySnapshot = await getDocs(beehivesRef);

  querySnapshot.forEach(async (docSnap) => {
    const beehive = docSnap.data();
    const { lessee } = beehive;

    if (lessee?.endDate) {
      const endDate = new Date(lessee.endDate);

      if (endDate < today) {
        // Створюємо об'єкт для історії
        const historyEntry = {
          uid: lessee.uid,
          startDate: lessee.startDate,
          endDate: lessee.endDate,
          type: lessee.type,
        };

        // Оновлюємо історію
        const newHistory = [...(lessee.history || []), historyEntry];

        // Оновлюємо Firestore
        const beehiveRef = doc(db, "hives", docSnap.id);
        await updateDoc(beehiveRef, {
          "lessee.uid": "",
          "lessee.startDate": "",
          "lessee.endDate": "",
          "lessee.history": newHistory,
        });
      }
    }
  });

  return true; // Додаємо, щоб `onSuccess` міг спрацювати
};
