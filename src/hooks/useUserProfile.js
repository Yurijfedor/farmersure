import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

import {
  saveUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../services/user";
import { setUserProfile } from "../redux/userSlice";

import db from "../firebase"; // Імпортуйте ваш екземпляр Firestore

// import { getAuth } from "firebase/auth";

export const useUserProfile = () => {
  const dispatch = useDispatch();
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
  }, [dispatch, userId]);

  const updateProfile = async (userData) => {
    if (userId) {
      try {
        await updateUserProfile(userId, userData); // Зберігаємо/оновлюємо профіль в Firestore
        setProfile(userData);
        dispatch(setUserProfile(userData));
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
