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

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    // Налаштування сесії тільки на час сесії браузера
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setIsAuth(true);

            // Перевірка чи користувач є адміністратором
            const adminDocRef = doc(db, "admins", user.uid);
            const adminDoc = await getDoc(adminDocRef);

            if (adminDoc.exists()) {
              setIsAdmin(true); // Якщо документ існує, користувач — адміністратор
            } else {
              setIsAdmin(false); // Інакше, користувач не адміністратор
            }
          } else {
            localStorage.removeItem("user");
            setIsAuth(false);
            setIsAdmin(false);
          }
          setLoading(false); // Після зміни стану автентифікації закінчуємо завантаження
        });
        return unsubscribe;
      })
      .catch((error) => {
        console.error("Помилка при налаштуванні persistence:", error);
        setLoading(false); // Якщо є помилка, також припиняємо завантаження
      });
  }, []);

  return { isAuth, isAdmin, loading }; // Повертаємо isAdmin та isAuth
};
