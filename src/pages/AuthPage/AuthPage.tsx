import React from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '../../components/UI';
import { registerWithEmailAndPassword, User } from '../../firebase';

import styles from './AuthPage.module.css';

interface FormValues extends User {
  password: string;
}

export const AuthPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>();
  const [isSignUp, setIsSignUp] = React.useState(true);

  return (
    <div className={styles.page}>
      {isSignUp && (
        <form
          className={styles.registerForm}
          onSubmit={handleSubmit(({ password, ...user }) =>
            registerWithEmailAndPassword(user, password)
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
          <Input
            {...register('city')}
            placeholder="City"
            type="password"
            disabled={isSubmitting}
          />
          <button type="submit">Sign up</button>
        </form>
      )}
    </div>
  );
};
