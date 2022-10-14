import { updateProfile } from "firebase/auth";
import {
  doc,
  DocumentData,
  updateDoc,
  WithFieldValue,
} from "firebase/firestore";

import { auth, Collection, db } from "../config";

export const updateDocument = async <T extends WithFieldValue<DocumentData>>(
  collection: Collection,
  data: T,
  id: string
) => {
  const documentRef = doc(db, collection, id);

  await updateProfile(auth.currentUser!, data);
  await updateDoc(documentRef, data);
};
