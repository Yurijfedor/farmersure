import db from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchAllHives = async () => {
  const querySnapshot = await getDocs(collection(db, "hives"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
