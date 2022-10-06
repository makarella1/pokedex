import React from "react";

import userDefault from "../../assets/img/user_default.png";
import { Loader, PageLayout } from "../../components";
import { useAuthState } from "../../utils/firebase/hooks";

import styles from "./SettingsPage.module.css";

interface SettingsPageProps {}

export const SettingsPage = () => {
  const [file, setFile] = React.useState<File | null>(null);

  const { data: user, isLoading } = useAuthState();

  const isUser = user && !isLoading;

  if (!isUser) {
    return <Loader />;
  }

  const uploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const [file] = event.target.files;

    setFile(file);

    console.log(file);
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
    </PageLayout>
  );
};
