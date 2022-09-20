import { AxiosRequestConfig } from 'axios';

import { pokemonApi } from '../../pokemonApi';

interface GetPokemonsParams {
  params: {
    offset: number;
    limit: number;
  };
  config?: AxiosRequestConfig;
}

export const getPokemons = ({ params, config }: GetPokemonsParams) =>
  pokemonApi.get<NamedAPIResourceList>(`pokemon`, { params, ...config });
