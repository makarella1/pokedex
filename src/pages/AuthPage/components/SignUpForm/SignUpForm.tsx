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

export const SignUpForm: React.FC = () => {
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

  const isDisabled = isLoading || isSubmitting;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(({ password, ...user }) =>
        registerWithEmailAndPassword({ user, password })
      )}
    >
      <Input
        {...register("name", {
          required: "What's your name?",
          minLength: {
            value: 2,
            message: "Name should be at least 2 characters!",
          },
        })}
        placeholder="Name"
        disabled={isDisabled}
        error={errors.name?.message}
      />
      <Input
        {...register("email", {
          required: "Email is required!",
          pattern: { value: getEmailRegExp(), message: "Email's not valid" },
        })}
        placeholder="Email"
        disabled={isDisabled}
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
      <Button variant="red" type="submit">
        Sign up
      </Button>
    </form>
  );
};
