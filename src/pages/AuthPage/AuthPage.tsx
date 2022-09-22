import React from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '../../components/UI';
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  User,
} from '../../firebase';

import styles from './AuthPage.module.css';

interface SignUpValues extends User {
  password: string;
}

export const SignUpForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SignUpValues>();

  return (
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
      <Input {...register('city')} placeholder="City" disabled={isSubmitting} />
      <button type="submit">Sign up</button>
    </form>
  );
};

interface SignInValues extends User {
  password: string;
  email: User['email'];
}

export const SignInForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SignInValues>();

  return (
    <form
      className={styles.registerForm}
      onSubmit={handleSubmit(({ password, ...user }) =>
        registerWithEmailAndPassword(user, password)
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
      <button type="submit">Sign in</button>
    </form>
  );
};

export const AuthPage: React.FC = () => {
  const [isSignedUp, setIsSignedUp] = React.useState(false);

  return (
    <div className={styles.page}>
      {isSignedUp && <SignInForm />}
      {!isSignedUp && <SignUpForm />}
      <button onClick={() => setIsSignedUp((prevState) => !prevState)}>
        {!isSignedUp ? 'Already have an account' : 'Sign up'}
      </button>
    </div>
  );
};
