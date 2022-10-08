import { signOut, updateProfile } from "firebase/auth";
import React from "react";

import userDefault from "../../assets/img/user_default.png";
import { Loader, PageLayout } from "../../components";
import { auth } from "../../utils/firebase/config";
import {
  useAuthState,
  useUpdateDocumentMutation,
  useUploadFile,
} from "../../utils/firebase/hooks";

import styles from "./SettingsPage.module.css";

export const SettingsPage: React.FC = () => {
  const { data: user, isLoading } = useAuthState();
  const { uploadFile } = useUploadFile();
  const updateDocumentMutation = useUpdateDocumentMutation({
    options: {
      onSuccess: () => {
        console.log("success!");
      },
    },
  });

  const isUser = user && !isLoading;

  if (!isUser) {
    return <Loader />;
  }

  console.log(user);

  const uploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const [newFile] = event.target.files;

    const url = await uploadFile(newFile);

    updateDocumentMutation.mutateAsync({
      collection: "users",
      data: { photoURL: url },
      id: user.uid,
    });
  };

  return (
    <PageLayout>
      <div className={styles.container}>
        <label htmlFor="file">
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={uploadHandler}
            accept="image/*"
          />
          <img
            className={styles.avatar}
            src={user.photoURL ?? userDefault}
            alt={user.displayName}
            onError={({ currentTarget }) => {
              currentTarget.src = userDefault;
              currentTarget.onerror = null;
            }}
          />
        </label>
        <h1 className={styles.name}>{user.displayName}</h1>
      </div>
      <button onClick={() => signOut(auth)}>dadada</button>
    </PageLayout>
  );
};
