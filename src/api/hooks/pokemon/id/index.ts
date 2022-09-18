import { useQuery } from '@tanstack/react-query';

import { getPokemon } from '../../../requests';

interface UseGetPokemonQueryParams {
  id: number;
}

export const useGetPokemonQuery = (
  params: RequestParams<UseGetPokemonQueryParams>,
  settings?: RequestQuerySettings<typeof getPokemon>
) =>
  useQuery(
    ['pokemon', params?.id],
    () =>
      getPokemon({
        params,
        ...(settings?.config && { config: settings?.config }),
      }),
    settings?.options && settings.options
  );
