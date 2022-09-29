import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button, Input } from "../../../../components/UI";
import { ROUTES } from "../../../../utils/constants";
import { useStore } from "../../../../utils/contexts";
import { useLoginWithEmailAndPasswordMutation } from "../../../../utils/firebase/hooks";
import { getEmailRegExp } from "../../../../utils/helpers";

import styles from "./SignInForm.module.css";

interface SignInValues extends User {
  password: string;
  email: User["email"];
}

export const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const { setStore } = useStore();

  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignInValues>();

  const { mutate: loginWithEmailAndPassword, isLoading } =
    useLoginWithEmailAndPasswordMutation({
      options: {
        onSuccess: () => {
          navigate(`${ROUTES.POKEMONS}`);
          setStore({ session: { isLoggedIn: true } });
        },
        onError: (error: FirebaseError) => {
          switch (error.code) {
            case "auth/user-not-found":
              setError(
                "email",
                { message: "Wrong credentials!" },
                { shouldFocus: true }
              );
              break;
            case "auth/wrong-password":
              setError(
                "email",
                { message: "Wrong credentials!" },
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

  const isDisabled = isLoading && isSubmitting;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(({ password, ...user }) =>
        loginWithEmailAndPassword({ password, email: user.email })
      )}
    >
      <Input
        {...register("email", {
          required: "Field is required!",
          pattern: { value: getEmailRegExp(), message: "Email isn't valid!" },
        })}
        placeholder="Email"
        disabled={isDisabled}
        error={errors.email?.message}
      />
      <Input
        {...register("password", {
          required: "Field is required!",
          minLength: {
            value: 6,
            message: "Password is at least 6 characters!",
          },
        })}
        placeholder="Password"
        type="password"
        disabled={isDisabled}
        error={errors.password?.message}
      />
      <Button variant="blue" type="submit">
        GO!
      </Button>
    </form>
  );
};
