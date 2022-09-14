import { AxiosRequestConfig } from 'axios';

import { pokemonApi } from '../../../pokemonApi';

interface RequestPokemonParams {
  params: {
    id: number;
  };
  config?: AxiosRequestConfig;
}

export const getPokemon = ({ params, config }: RequestPokemonParams) =>
  pokemonApi.get<Pokemon>(`pokemon/${params.id}`, { ...config });
