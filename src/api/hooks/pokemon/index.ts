import { useInfiniteQuery } from '@tanstack/react-query';

import { getPokemons } from '../../requests/pokemon';

const POKEMONS_REQUEST_LIMIT = 30;
const MAX_POKEMONS_COUNT = 900;

interface UseGetPokemonInfiniteQuery {
  offset?: number;
}

export const useGetPokemonInfiniteQuery = () =>
  useInfiniteQuery(
    ['pokemon'],
    ({ pageParam = 0 }) =>
      getPokemons({
        params: { offset: pageParam, limit: POKEMONS_REQUEST_LIMIT },
      }),
    {
      getNextPageParam: (lastPage, _allPages) => {
        const queries = lastPage.data.next?.split('?').at(1);

        const offset = Number(new URLSearchParams(queries).get('offset'));

        if (offset !== MAX_POKEMONS_COUNT) {
          return offset;
        }
      },
    }
  );
