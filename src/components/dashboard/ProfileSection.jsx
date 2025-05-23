import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useUserProfile } from "../../hooks/useUserProfile";
import { uploadProfilePicture } from "../../services/user";
import {
  selectUserProfile,
  selectIsProfileLoading,
  selectProfileError,
} from "../../redux/selectors";

import { Button } from "../button/Button";

export const ProfileSection = () => {
  const profile = useSelector(selectUserProfile);
  const loading = useSelector(selectIsProfileLoading);
  const error = useSelector(selectProfileError);
  const { updateProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Синхронізація editableProfile з profile
  useEffect(() => {
    if (profile) {
      setEditableProfile(profile);
    }
  }, [profile]);

  // Обробник для завантаження зображення
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Завантаження зображення в Firebase Storage
  const handleImageUpload = async () => {
    if (!image) return;
    setUploading(true);
    try {
      const imageUrl = await uploadProfilePicture(image, profile.id); // profile.id як унікальний ідентифікатор
      setEditableProfile((prev) => ({ ...prev, customPhotoURL: imageUrl }));
      setImage(null);
      setUploading(false);
      updateProfile(editableProfile);
    } catch (err) {
      console.error("Помилка завантаження фото:", err);
      setUploading(false);
    }
  };

  const handleSave = () => {
    updateProfile(editableProfile);
    setIsEditing(false);
  };

  return (
    <div>
      {loading ? (
        <p>Завантаження...</p>
      ) : error ? (
        <p>Помилка: {error}</p>
      ) : (
        editableProfile && (
          <div>
            <h2>Особиста інформація</h2>
            <div>
              <img
                src={
                  editableProfile.customPhotoURL ||
                  editableProfile.photoURL ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                style={{ width: 150, height: 150, borderRadius: "50%" }}
              />
              {isEditing && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <Button
                    size="small"
                    onClick={handleImageUpload}
                    disabled={!image || uploading}
                  >
                    {uploading ? "Завантаження..." : "Завантажити фото"}
                  </Button>
                </div>
              )}
            </div>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={editableProfile.name}
                  onChange={(e) =>
                    setEditableProfile((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={editableProfile.email}
                  onChange={(e) =>
                    setEditableProfile((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="phone"
                  value={editableProfile.phone}
                  onChange={(e) =>
                    setEditableProfile((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
                <Button size="small" onClick={handleSave}>
                  Зберегти
                </Button>
              </div>
            ) : (
              <div>
                <p>Ім'я: {editableProfile.name}</p>
                <p>Електронна пошта: {editableProfile.email}</p>
                <p>Телефон: {editableProfile.phone}</p>
                <Button size="small" onClick={() => setIsEditing(true)}>
                  Редагувати
                </Button>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};
