const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Ініціалізація Firebase Admin SDK
admin.initializeApp();

// Функція для призначення ролі адміністратору
exports.addAdminRole = functions.https.onCall(async (data, context) => {
  // Перевірка, чи користувач є авторизованим адміністратором
  if (context.auth.token.admin !== true) {
    throw new functions.https.HttpsError(
        "failed-precondition",
        "Only admins can assign roles",
    );
  }

  // Отримуємо ID користувача, якому призначається роль
  const uid = data.uid;

  try {
    // Призначаємо роль адміністратору користувачу
    await admin.auth().setCustomUserClaims(uid, {admin: true});
    return {message: `Success! ${uid} has been made an admin.`};
  } catch (error) {
    return {error: error.message};
  }
});
