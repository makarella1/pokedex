import { useInfiniteQuery } from '@tanstack/react-query';

import { getPokemon } from '../../requests';

export const useGetPokemonQuery = () =>
  useInfiniteQuery<any>(
    ['pokemon'],
    ({ pageParam = 0 }) =>
      getPokemon({ params: { offset: pageParam, limit: 20 } }),
    {
      getNextPageParam: (lastPage, _pages) => {
        const queries: string = lastPage.data.next.split('?').at(1);
        const params = new URLSearchParams(queries);

        const nextOffset = Number(params.get('offset'));

        return nextOffset;
      },
    }
  );
