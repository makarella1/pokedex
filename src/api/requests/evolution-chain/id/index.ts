import { AxiosRequestConfig } from 'axios';

import { pokemonApi } from '../../../pokemonApi';

interface RequestEvolutionChainParams {
  params: {
    id: number;
  };
  config?: AxiosRequestConfig;
}

export const getEvolutionChain = ({
  params,
  config,
}: RequestEvolutionChainParams) =>
  pokemonApi.get<EvolutionChain>(`evolution-chain/${params.id}`, { ...config });
