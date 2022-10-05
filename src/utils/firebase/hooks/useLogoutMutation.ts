import { useMutation } from "@tanstack/react-query";

import { logout } from "../requests";

export const useLogoutMutation = (
  settings?: RequestMutationSettings<typeof logout>
) =>
  useMutation(
    ["logout"],
    () => logout(),
    settings?.options && settings?.options
  );
