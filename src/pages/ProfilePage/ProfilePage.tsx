import React from "react";

import userDefault from "../../assets/img/user_default.png";
import { Loader } from "../../components";
import { useAuthState } from "../../utils/firebase/hooks";

import styles from "./ProfilePage.module.css";

export const ProfilePage: React.FC = () => {
  const { data: user, isLoading } = useAuthState();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>{user?.displayName}</div>
      <div>{user?.email}</div>
      <img src={user?.photoURL ?? userDefault} alt="User Avatar" />
    </div>
  );
};
