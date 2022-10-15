import { AxiosRequestConfig } from "axios";

import { pokemonApi } from "../pokemonApi";

interface GetStatParams {
  params: {
    id: Pokemon["id"];
  };
  config?: AxiosRequestConfig;
}

export const getStat = ({ params, config }: GetStatParams) =>
  pokemonApi.get<PokemonStat>(`pokemon/${params.id}`, { ...config });
