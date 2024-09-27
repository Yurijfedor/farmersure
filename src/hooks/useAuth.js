import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false); // Початкове значення
  const [loading, setLoading] = useState(true); // Додали стан для завантаження

  useEffect(() => {
    const auth = getAuth();

    // Налаштування збереження сесії тільки на час сесії браузера
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setIsAuth(true);
          } else {
            localStorage.removeItem("user");
            setIsAuth(false);
          }
          setLoading(false); // Після зміни стану авторизації змінюємо loading на false
        });
        return unsubscribe;
      })
      .catch((error) => {
        console.error("Помилка при налаштуванні persistence:", error);
        setLoading(false); // Якщо є помилка, також припиняємо завантаження
      });
  }, []);

  return { isAuth, loading };
};
