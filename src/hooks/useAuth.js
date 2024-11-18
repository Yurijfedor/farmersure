import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false); // Стан для автентифікації
  const [isAdmin, setIsAdmin] = useState(false); // Стан для адміністратора
  const [loading, setLoading] = useState(true); // Стан завантаження
  const [isAuthenticating, setIsAuthenticating] = useState(true); // Стан завершення процесу автентифікації

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setIsAuthenticating(true); // Початок процесу автентифікації
            localStorage.setItem("user", JSON.stringify(user));
            setIsAuth(true);

            // Перевірка чи користувач є адміністратором
            try {
              const adminDocRef = doc(db, "admins", user.uid);
              const adminDoc = await getDoc(adminDocRef);

              setIsAdmin(adminDoc.exists());
            } catch (error) {
              console.error("Помилка перевірки адміністратора:", error);
            }
          } else {
            localStorage.removeItem("user");
            setIsAuth(false);
            setIsAdmin(false);
          }
          setIsAuthenticating(false); // Завершення процесу автентифікації
          setLoading(false); // Завершення завантаження
        });

        return unsubscribe;
      })
      .catch((error) => {
        console.error("Помилка при налаштуванні persistence:", error);
        setLoading(false);
        setIsAuthenticating(false);
      });
  }, []);

  return { isAuth, isAdmin, loading, isAuthenticating }; // Додаємо isAuthenticating
};
