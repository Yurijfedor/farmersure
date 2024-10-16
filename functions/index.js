/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions");

const { assignAdminRole } = require("./roles");

// Функція для призначення ролі адміністратору
exports.setAdmin = functions.https.onRequest(async (req, res) => {
  const uid = req.body.uid; // Отримайте UID з тіла запиту
  await assignAdminRole(uid);
  res.send(`Admin role assigned to user with UID: ${uid}`);
});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
