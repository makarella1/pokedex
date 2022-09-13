import { AxiosRequestConfig } from 'axios';

import { pokemonApi } from '../../../pokemonApi';

interface RequestPokemonData {
  params: {
    id: number;
  };
  config?: AxiosRequestConfig;
}

export const getPokemon = ({ params, config }: RequestPokemonData) =>
  pokemonApi.get(`pokemon/${params.id}`, { ...config });
