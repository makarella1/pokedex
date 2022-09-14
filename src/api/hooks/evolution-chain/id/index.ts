import { useQuery } from '@tanstack/react-query';

import { getEvolutionChain } from '../../../requests';

interface UseGetPokemonFormsQueryParams {
  id: number;
  config?: any;
}

export const useGetEvolutionChainQuery = ({
  id,
}: UseGetPokemonFormsQueryParams) =>
  useQuery(['evolution-chain', id], () =>
    getEvolutionChain({ params: { id } })
  );
