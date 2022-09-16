import { useQuery } from '@tanstack/react-query';

import { getPokemon } from '../../../requests';

interface UseGetPokemonQueryParams {
  id: number;
}

export const useGetPokemonQuery = ({
  params,
  config,
}: RequestQueryParams<UseGetPokemonQueryParams>) =>
  useQuery(
    ['pokemon', params?.id],
    () => getPokemon({ params: { id: params!.id } }),
    config
  );
