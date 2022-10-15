import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button, Input } from "../../../../components/UI";
import { ROUTES } from "../../../../utils/constants";
import { useRegisterWithEmailAndPasswordMutation } from "../../../../utils/firebase/hooks";
import { getEmailRegExp } from "../../../../utils/helpers";

import styles from "./SignUpForm.module.css";

interface SignUpValues extends User {
  password: string;
}

export const SignUpForm = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignUpValues>();

  const { mutate: registerWithEmailAndPassword, isLoading } =
    useRegisterWithEmailAndPasswordMutation({
      options: {
        onSuccess: () => navigate(ROUTES.POKEMONS),
        onError: (error: FirebaseError) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              setError(
                "email",
                { message: "Email already in use!" },
                { shouldFocus: true }
              );
              break;
            default:
              setError(
                "email",
                { message: "Something went wrong..." },
                { shouldFocus: true }
              );
              break;
          }
        },
      },
    });

  const registerHandler = handleSubmit(({ password, ...user }) => {
    registerWithEmailAndPassword({ user, password });
  });

  const isDisabled = isLoading || isSubmitting;

  return (
    <form className={styles.form} onSubmit={registerHandler}>
      <Input
        {...register("displayName", {
          required: "What's your name?",
          minLength: {
            value: 2,
            message: "Name should be at least 2 characters!",
          },
        })}
        placeholder="Name"
        disabled={isDisabled}
        // @ts-ignore
        error={errors.displayName?.message}
      />
      <Input
        {...register("email", {
          required: "Email is required!",
          pattern: { value: getEmailRegExp(), message: "Email's not valid" },
        })}
        placeholder="Email"
        disabled={isDisabled}
        // @ts-ignore
        error={errors.email?.message}
      />
      <Input
        {...register("password", {
          required: "Password should be at least 6 characters!",
        })}
        placeholder="Password"
        type="password"
        disabled={isDisabled}
        error={errors.password?.message}
      />
      <Button variant="primary" type="submit">
        Sign up
      </Button>
    </form>
  );
};
