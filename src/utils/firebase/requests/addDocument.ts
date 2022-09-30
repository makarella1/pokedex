import {
  addDoc,
  collection,
  DocumentData,
  WithFieldValue,
} from "firebase/firestore";

import { db } from "../config";

export const addDocument = async <T extends WithFieldValue<DocumentData>>(
  col: Collection,
  document: T
) => {
  const data = await addDoc(collection(db, col), document);

  return data;
};
