import { useState, useEffect } from "react";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

import {
  saveUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../services/user";

import db from "../firebase"; // Імпортуйте ваш екземпляр Firestore

// import { getAuth } from "firebase/auth";

export const useUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.uid;

  useEffect(() => {
    if (userId) {
      getUserProfile(userId)
        .then((data) => {
          setProfile(data); // Завантажуємо профіль з Firestore
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [userId]);

  const updateProfile = async (userData) => {
    console.log(userId);

    if (userId) {
      try {
        await updateUserProfile(userId, userData); // Зберігаємо/оновлюємо профіль в Firestore
        setProfile(userData);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
};
