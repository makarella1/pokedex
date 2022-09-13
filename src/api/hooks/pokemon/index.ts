import { useQueries } from '@tanstack/react-query';

import { getPokemon } from '../../requests';

interface UseGetPokemonQueriesParams {
  offset: number;
}

const createQueries = (offset: number) =>
  Array.from({ length: offset }, (_el, index) => {
    const id = index + 1;
    return {
      queryKey: ['pokemon', index],
      queryFn: () => getPokemon({ params: { id } }),
    };
  });

export const useGetPokemonQueries = ({ offset }: UseGetPokemonQueriesParams) =>
  useQueries<any>({ queries: createQueries(offset) });
