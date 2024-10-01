import { collection, getDocs, getDoc, doc } from "firebase/firestore";

import db from "../firebase";

export const fetchAllHives = async () => {
  const querySnapshot = await getDocs(collection(db, "hives"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const fetchHiveById = async ({ hiveId }) => {
  if (typeof hiveId !== "string") {
    throw new Error("Invalid hive ID");
  }
  const docRef = doc(db, "hives", "GGTAWhEwXJhMdzdn8G36");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } else {
    throw new Error("Hive not found");
  }
};
