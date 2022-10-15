import { useQuery } from "@tanstack/react-query";

import { getPokemon } from "../requests/getPokemon";

interface UseGetPokemonQueryParams {
  option: number | string;
}

export const useGetPokemonQuery = (
  params: RequestParams<UseGetPokemonQueryParams>,
  settings?: RequestQuerySettings<typeof getPokemon>
) =>
  useQuery(
    ["pokemon", params?.option],
    () =>
      getPokemon({
        params,
        ...(settings?.config && { config: settings?.config }),
      }),
    settings?.options && settings.options
  );
