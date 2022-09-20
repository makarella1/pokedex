import { useQuery } from '@tanstack/react-query';

import { getPokemonSpecies } from '../../requests';

interface UseGetPokemonSpeciesQueryParams {
  id: number;
}

export const useGetPokemonSpeciesQuery = (
  params: RequestParams<UseGetPokemonSpeciesQueryParams>,
  settings?: RequestQuerySettings<typeof getPokemonSpecies>
) =>
  useQuery(
    ['pokemon-form', params.id],
    () =>
      getPokemonSpecies({
        params,
        ...(settings?.config && { config: settings.config }),
      }),
    {
      ...(settings?.options && settings.options),
    }
  );
