import React from 'react';
import { useForm } from 'react-hook-form';

import authLogo from '../../assets/img/auth_image.png';
import { Button, Input } from '../../components/UI';
import { registerWithEmailAndPassword } from '../../utils/firebase/requests';

import { SignInForm } from './components';

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
      <Button variant="red" type="submit">
        Sign up
      </Button>
    </form>
  );
};

export const AuthPage: React.FC = () => {
  const [isSignedUp, setIsSignedUp] = React.useState(false);

  return (
    <div className={styles.page}>
      <img className={styles.authLogo} src={authLogo} alt="Logo" />
      <h1 className={styles.authTitle}>Login</h1>
      {isSignedUp && <SignInForm />}
      {!isSignedUp && <SignUpForm />}
      <Button
        variant="outlinedBlue"
        onClick={() => setIsSignedUp((prevState) => !prevState)}
        type="button"
      >
        {!isSignedUp ? 'Already have an account' : 'Sign up'}
      </Button>
    </div>
  );
};
