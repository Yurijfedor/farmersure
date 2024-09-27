import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false); // Початкове значення false

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
        });
        return unsubscribe; // Повернення функції відписки від оновлень
      })
      .catch((error) => {
        console.error("Помилка при налаштуванні persistence:", error);
      });
  }, []);

  return { isAuth };
};
