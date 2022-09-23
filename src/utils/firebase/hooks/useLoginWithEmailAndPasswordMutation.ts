import { useMutation } from '@tanstack/react-query';

import { loginWithEmailAndPassword } from '../requests';

interface UseLoginWithEmailAndPasswordMutationParams {
  email: User['email'];
  password: string;
}

export const useLoginWithEmailAndPasswordMutation = (
  settings?: RequestMutationSettings<typeof loginWithEmailAndPassword>
) =>
  useMutation(
    ['login'],
    (params: RequestParams<UseLoginWithEmailAndPasswordMutationParams>) =>
      loginWithEmailAndPassword(params.email, params.password),
    settings?.options && settings.options
  );
