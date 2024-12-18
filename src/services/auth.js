import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// import db from "../firebase"; // Імпортуйте ваш екземпляр Firestore

import { saveUserProfile, syncUserProfile } from "./user";
const auth = getAuth();

/**
 * Реєстрація нового користувача
 */
export const register = async (userData) => {
  try {
    const { email, password, name } = userData;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Збереження профілю у Firestore
    await saveUserProfile(user.uid, {
      name: name || "Ім'я Користувача",
      email: user.email,
      phone: "",
    });

    localStorage.setItem(
      "user",
      JSON.stringify({ uid: user.uid, email: user.email })
    );
    return true;
  } catch (error) {
    console.error("Помилка реєстрації:", error.message);
    throw new Error(error.message);
  }
};

/**
 * Вхід через email і пароль
 */
export const logInWithEmail = async (userData) => {
  try {
    const { email, password } = userData;
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    const userProfile = {
      uid: user.uid,
      email: user.email,
    };

    await syncUserProfile(user);
    await saveUserProfile(user.uid, userProfile);

    // Збереження профілю в localStorage
    localStorage.setItem("user", JSON.stringify(userProfile));

    return userProfile; // Повертаємо профіль користувача
  } catch (error) {
    console.error("Помилка входу:", error.message);
    throw new Error(error.message);
  }
};

/**
 * Вхід через Google
 */
export const logInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    const userProfile = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL, // URL фото профілю з Google
    };

    await syncUserProfile(user);
    await saveUserProfile(user.uid, userProfile);

    // Збереження профілю в localStorage
    localStorage.setItem("user", JSON.stringify(userProfile));

    return userProfile; // Повертаємо профіль користувача
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Вихід з системи
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
    return true;
  } catch (error) {
    console.error("Помилка виходу:", error.message);
    throw new Error(error.message);
  }
};
