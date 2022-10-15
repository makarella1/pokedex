import { AxiosRequestConfig } from "axios";

import { pokemonApi } from "../pokemonApi";

interface GetPokemonParams {
  params: {
    option: Pokemon["id"] | Pokemon["name"];
  };
  config?: AxiosRequestConfig;
}

export const getPokemon = ({ params, config }: GetPokemonParams) =>
  pokemonApi.get<Pokemon>(`pokemon/${params.option}`, { ...config });
