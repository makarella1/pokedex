import {
  getDownloadURL,
  ref,
  StorageError,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";

import { storage } from "../config";

import { useAuthState } from "./useAuthState";

interface UseUploadFile {
  error: StorageError | null;
  progress: number;
  uploadFile: (file: File) => Promise<string>;
}

export const useUploadFile = (): UseUploadFile => {
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<StorageError | null>(null);

  const { data: user } = useAuthState();

  const uploadFile = async (file: File) => {
    const fileName = `avatar_${user?.uid}`;
    const fileRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgress(progress);
        },
        (error) => {
          setError(error);
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  return { error, progress, uploadFile };
};
