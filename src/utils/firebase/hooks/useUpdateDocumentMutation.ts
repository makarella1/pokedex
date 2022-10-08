import { useMutation } from "@tanstack/react-query";

import { Collection } from "../config";
import { updateDocument } from "../requests";

interface UseUpdateUserDocumentParams {
  collection: Extract<Collection, "users">;
  id: UserDocument["uid"];
  data: Partial<UserDocument>;
}

interface UseUpdatePokemonDocumentParams {
  collection: Extract<Collection, "pokemons">;
  id: Pokemon["id"];
  data: Partial<PokemonDocument>;
}

type UseUpdateDocumentParams =
  | UseUpdatePokemonDocumentParams
  | UseUpdateUserDocumentParams;

export const useUpdateDocumentMutation = (
  settings?: RequestMutationSettings<typeof updateDocument>
) =>
  useMutation(
    ["updateDocument"],
    (params: RequestParams<UseUpdateDocumentParams>) =>
      updateDocument(params.collection, params.data, String(params.id)),
    settings?.options && settings.options
  );
