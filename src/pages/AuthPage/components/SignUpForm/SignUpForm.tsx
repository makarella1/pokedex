import { useForm } from 'react-hook-form';

import { Button, Input } from '../../../../components/UI';
import { useRegisterWithEmailAndPasswordMutation } from '../../../../utils/firebase/hooks';

import styles from './SignUpForm.module.css';

interface SignUpValues extends User {
  password: string;
}

export const SignUpForm: React.FC = () => {
  const { mutate: registerWithEmailAndPassword } =
    useRegisterWithEmailAndPasswordMutation();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SignUpValues>();

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(({ password, ...user }) =>
        registerWithEmailAndPassword({ user, password })
      )}
    >
      <Input
        {...register('firstName')}
        placeholder="First name"
        disabled={isSubmitting}
      />
      <Input
        {...register('lastName')}
        placeholder="Last name"
        disabled={isSubmitting}
      />
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
      <Input {...register('city')} placeholder="City" disabled={isSubmitting} />
      <Button variant="red" type="submit">
        Sign up
      </Button>
    </form>
  );
};
