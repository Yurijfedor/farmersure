import { useEffect } from "react";

// Хук для блокування прокрутки
export const useLockBodyScroll = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden"; // Блокуємо прокрутку
    } else {
      document.body.style.overflow = "auto"; // Відновлюємо прокрутку
    }

    return () => {
      document.body.style.overflow = "auto"; // Відновлюємо при видаленні компонента
    };
  }, [isLocked]);
};
