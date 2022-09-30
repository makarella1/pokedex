import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import authLogo from "../../assets/img/auth_image.png";
import { Button } from "../../components/UI";
import { ROUTES } from "../../utils/constants";
import { useStore } from "../../utils/contexts";
import { useAuthWithGoogle } from "../../utils/firebase/hooks";

import { SignInForm, SignUpForm } from "./components";

import styles from "./AuthPage.module.css";

export const AuthPage: React.FC = () => {
  const [isSignedUp, setIsSignedUp] = React.useState(false);
  const { setStore } = useStore();

  const navigate = useNavigate();

  const { mutate: authWithGoogle } = useAuthWithGoogle({
    options: {
      onSuccess: () => {
        navigate(ROUTES.POKEMONS);
        setStore({ session: { isLoggedIn: true } });
      },
    },
  });

  return (
    <div className={styles.page}>
      <img className={styles.authLogo} src={authLogo} alt="Logo" />
      <div className={styles.formContainer}>
        <h1 className={styles.authTitle}>Login</h1>
        {isSignedUp && <SignInForm />}
        {!isSignedUp && <SignUpForm />}
        <Button variant="outlinedBlue" onClick={() => authWithGoogle({})}>
          <FcGoogle size={20} />
          Authenticate with GOOGLE
        </Button>
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
