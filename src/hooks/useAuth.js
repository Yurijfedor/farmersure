import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuth(true);
      } else {
        localStorage.removeItem("user");
        setIsAuth(false);
      }
    });
    return unsubscribe;
  }, []);

  return { isAuth };
};
