import React from "react";
import { useForm } from "react-hook-form";
import { GoPencil } from "react-icons/go";

import userDefault from "../../assets/img/user_default.png";
import { Loader, PageLayout } from "../../components";
import { SettingsButton } from "../../components/UI";
import {
  useAuthState,
  useUpdateDocumentMutation,
  useUploadFile,
} from "../../utils/firebase/hooks";

import styles from "./SettingsPage.module.css";

export const SettingsPage = () => {
  const { data: user, isLoading } = useAuthState();
  const { uploadFile } = useUploadFile();
  const updateDocumentMutation = useUpdateDocumentMutation();
  const { register, handleSubmit } = useForm();

  const [isEditing, setIsEditing] = React.useState(false);

  const isUser = user && !isLoading;

  if (!isUser) {
    return <Loader />;
  }

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

  const nameChangeHandler = handleSubmit(({ displayName }) => {
    if (displayName.trim() === "" || displayName === user.displayName) {
      return setIsEditing(false);
    }

    updateDocumentMutation.mutateAsync({
      collection: "users",
      data: { displayName },
      id: user.uid,
    });

    setIsEditing(false);
  });

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
          <div className={styles.avatar}>
            <img
              className={styles.image}
              src={user.photoURL ?? userDefault}
              alt={user.displayName}
              onError={({ currentTarget }) => {
                currentTarget.src = userDefault;
                currentTarget.onerror = null;
              }}
            />
            <SettingsButton className={styles.editImage}>
              <GoPencil />
            </SettingsButton>
          </div>
        </label>
        <div className={styles.info}>
          <p className={styles.infoItem}>
            <span>{user.uid}</span>
          </p>
          {!isEditing && (
            <div className={styles.name}>
              <p className={styles.infoItem}>
                Username: <span>{user.displayName}</span>
              </p>
              <SettingsButton onClick={() => setIsEditing(true)}>
                <GoPencil />
              </SettingsButton>
            </div>
          )}
          {isEditing && (
            <form className={styles.form} onSubmit={nameChangeHandler}>
              <input
                className={styles.input}
                type="text"
                {...register("displayName")}
              />
              <div className={styles.buttons}>
                <SettingsButton
                  className={styles.edit}
                  type="button"
                  onClick={() => setIsEditing(false)}
                >
                  X
                </SettingsButton>
                <SettingsButton className={styles.edit}>OK</SettingsButton>
              </div>
            </form>
          )}
          <p className={styles.infoItem}>
            Email: <span>{user.email}</span>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};
