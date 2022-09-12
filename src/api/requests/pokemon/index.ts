import { AxiosRequestConfig } from 'axios';

import { pokemonApi } from '../../pokemonApi';

interface RequestPokemonData {
  params: {
    offset: number;
    limit: number;
  };
  config?: AxiosRequestConfig;
}

export const getPokemon = ({ params, config }: RequestPokemonData) =>
  pokemonApi.get('pokemon', { ...config, params });
