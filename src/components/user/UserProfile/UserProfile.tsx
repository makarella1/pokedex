import { User } from "firebase/auth";
import React from "react";

import userDefault from "../../../assets/img/user_default.png";
import { useLogoutMutation } from "../../../utils/firebase/hooks";
import { Button } from "../../UI/Button/Button";

import styles from "./UserProfile.module.css";

interface UserProfileProps {
  user: Partial<User>;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  const logout = useLogoutMutation();

  return (
    <div className={styles.profileCard}>
      <div className={styles.cardBody}>
        <img
          className={styles.profileImage}
          src={user?.photoURL ?? userDefault}
          alt="User Avatar"
        />
        <div className={styles.profileInfo}>
          <div className={styles.profileId}>{user?.uid}</div>
          <div className={styles.profileName}>{user?.displayName}</div>
          <div>{user?.email}</div>
        </div>
      </div>
      <Button variant="primary" onClick={() => logout.mutate({})}>
        Logout
      </Button>
    </div>
  );
};
