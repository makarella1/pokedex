import { AxiosRequestConfig } from 'axios';

import { pokemonApi } from '../../pokemonApi';

interface RequestPokemonsParams {
  params: {
    offset: number;
    limit: number;
  };
  config?: AxiosRequestConfig;
}

export const getPokemons = ({ params, config }: RequestPokemonsParams) =>
  pokemonApi.get<NamedAPIResourceList>(`pokemon`, { params, ...config });
