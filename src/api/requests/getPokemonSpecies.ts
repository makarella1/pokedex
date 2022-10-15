import { AxiosRequestConfig } from "axios";

import { pokemonApi } from "../pokemonApi";

interface GetPokemonSpeciesParams {
  params: {
    id: Pokemon["id"];
  };
  config?: AxiosRequestConfig;
}

export const getPokemonSpecies = ({
  params,
  config,
}: GetPokemonSpeciesParams) =>
  pokemonApi.get<PokemonSpecies>(`pokemon-species/${params.id}`, {
    ...config,
  });
