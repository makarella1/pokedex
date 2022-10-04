import {
  doc,
  DocumentData,
  updateDoc,
  WithFieldValue,
} from "firebase/firestore";

import { Collection, db } from "../config";

export const updateDocument = async <T extends WithFieldValue<DocumentData>>(
  collection: Collection,
  data: T,
  id: string
) => {
  const documentRef = doc(db, collection, id);

  await updateDoc(documentRef, data);
};
