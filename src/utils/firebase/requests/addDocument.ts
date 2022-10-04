import {
  addDoc,
  collection,
  doc,
  DocumentData,
  setDoc,
  WithFieldValue,
} from "firebase/firestore";

import { Collection, db } from "../config";

export const addDocument = async <T extends WithFieldValue<DocumentData>>(
  col: Collection,
  document: T,
  id?: string
) => {
  if (id) {
    await setDoc(doc(db, col, id), document);

    return document;
  }

  const data = await addDoc(collection(db, col), document);

  return data;
};
