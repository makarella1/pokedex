import { AxiosRequestConfig } from 'axios';

import { pokemonApi } from '../../../pokemonApi';

interface RequestStatParams {
  params: {
    id: number;
  };
  config?: AxiosRequestConfig;
}

export const getStat = ({ params, config }: RequestStatParams) =>
  pokemonApi.get<PokemonStat>(`pokemon/${params.id}`, { ...config });
