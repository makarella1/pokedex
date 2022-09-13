import { useQuery } from '@tanstack/react-query';

import { getPokemon } from '../../../requests';

interface UseGetPokemonQueryParams {
  id: number;
}

export const useGetPokemonQuery = ({ id }: UseGetPokemonQueryParams) =>
  useQuery<any>(['pokemon', id], () => getPokemon({ params: { id } }));
