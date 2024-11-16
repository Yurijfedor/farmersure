import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

// Функція для збереження або оновлення профілю користувача в Firestore
// Функція для отримання профілю користувача з Firestore
export const getUserProfile = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  console.log(userDoc);

  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    throw new Error("Профіль не знайдений");
  }
};

export const uploadProfilePicture = async (file, userId) => {
  try {
    const storageRef = ref(storage, `profilePictures/${userId}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    throw new Error("Не вдалося завантажити фото профілю.");
  }
};

export const syncUserProfile = async (user) => {
  const userDoc = await getDoc(doc(db, "users", user.uid));

  if (!userDoc.exists()) {
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      phone: "",
      photoURL: user.photoURL || "", // Додаємо URL профілю
    });
  } else if (!userDoc.data().photoURL && user.photoURL) {
    await updateDoc(doc(db, "users", user.uid), {
      photoURL: user.photoURL, // Додаємо URL, якщо його немає в Firestore
    });
  }
};

export const saveUserProfile = async (uid, data) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    // Додаємо дані тільки якщо профіль ще не існує
    if (!userDoc.exists()) {
      await setDoc(userDocRef, data);
    }
  } catch (error) {
    console.error("Помилка збереження профілю:", error.message);
  }
};
