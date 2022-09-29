import React from "react";

import authLogo from "../../assets/img/auth_image.png";
import { Button } from "../../components/UI";

import { SignInForm, SignUpForm } from "./components";

import styles from "./AuthPage.module.css";

export const AuthPage: React.FC = () => {
  const [isSignedUp, setIsSignedUp] = React.useState(false);

  return (
    <div className={styles.page}>
      <img className={styles.authLogo} src={authLogo} alt="Logo" />
      <div className={styles.formContainer}>
        <h1 className={styles.authTitle}>Login</h1>
        {isSignedUp && <SignInForm />}
        {!isSignedUp && <SignUpForm />}
        <Button
          variant="plain"
          onClick={() => setIsSignedUp((prevState) => !prevState)}
          type="button"
        >
          {!isSignedUp ? "Already have an account" : "Create new account"}
        </Button>
      </div>
    </div>
  );
};
