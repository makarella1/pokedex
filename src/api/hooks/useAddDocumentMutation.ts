import { useMutation } from "@tanstack/react-query";

import { addDocument } from "../../utils/firebase/requests";

interface UseAddDocumentMutationParams {
  document: PokemonDocument;
  collection: Collection;
}

export const useAddDocumentMutation = (
  settings?: RequestMutationSettings<typeof addDocument>
) =>
  useMutation(
    ["addDocument"],
    (params: RequestParams<UseAddDocumentMutationParams>) =>
      addDocument(params.collection, params.document),
    settings?.options && settings.options
  );
