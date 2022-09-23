import { useForm } from 'react-hook-form';

import { Button, Input } from '../../../../components/UI';
import { useLoginWithEmailAndPasswordMutation } from '../../../../utils/firebase/hooks';

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
        onError: (error) => console.log(error),
      },
    });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SignInValues>();

  console.log('isLoading', isLoading);

  return (
    <form
      className={styles.registerForm}
      onSubmit={handleSubmit(({ password, ...user }) =>
        loginWithEmailAndPassword({ password, email: user.email })
      )}
    >
      <Input
        {...register('email')}
        placeholder="Email"
        disabled={isSubmitting}
      />
      <Input
        {...register('password')}
        placeholder="Password"
        type="password"
        disabled={isSubmitting}
      />
      <Button variant="blue" type="submit">
        Sign in
      </Button>
    </form>
  );
};
