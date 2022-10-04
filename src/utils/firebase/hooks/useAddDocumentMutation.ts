import { useMutation } from "@tanstack/react-query";

import { Collection } from "../config";
import { addDocument } from "../requests";

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
