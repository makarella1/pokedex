import { useForm } from 'react-hook-form';

import { Button, Input } from '../../../../components/UI';
import { useLoginWithEmailAndPasswordMutation } from '../../../../utils/firebase/hooks';
import { getEmailRegExp } from '../../../../utils/helpers';

import styles from './SignInForm.module.css';

interface SignInValues extends User {
  password: string;
  email: User['email'];
}

export const SignInForm: React.FC = () => {
  const { mutate: loginWithEmailAndPassword, isLoading } =
    useLoginWithEmailAndPasswordMutation({
      options: {
        onSuccess: (data) => console.log('data', data),
        onError: (data) => console.log('data', data),
      },
    });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<SignInValues>();

  console.log(isLoading, isLoading);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(({ password, ...user }) =>
        loginWithEmailAndPassword({ password, email: user.email })
      )}
    >
      <Input
        {...register('email', {
          required: 'Field is required!',
          pattern: { value: getEmailRegExp(), message: "Email isn't valid!" },
        })}
        placeholder="Email"
        disabled={isSubmitting}
        error={errors.email?.message}
      />
      <Input
        {...register('password', {
          required: 'Field is required!',
          minLength: {
            value: 6,
            message: 'Password is at least 6 characters!',
          },
        })}
        placeholder="Password"
        type="password"
        disabled={isSubmitting}
        error={errors.password?.message}
      />
      <Button variant="blue" type="submit">
        Sign in
      </Button>
    </form>
  );
};
