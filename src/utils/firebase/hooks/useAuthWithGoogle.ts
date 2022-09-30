import { useMutation } from "@tanstack/react-query";

import { authWithGoogle } from "../requests";

export const useAuthWithGoogle = (
  settings?: RequestMutationSettings<typeof authWithGoogle>
) =>
  useMutation(
    ["authWithGoogle"],
    () => authWithGoogle(),
    settings?.options && settings.options
  );
