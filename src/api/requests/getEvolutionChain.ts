import { AxiosRequestConfig } from "axios";

import { pokemonApi } from "../pokemonApi";

interface GetEvolutionChainParams {
  params: {
    id: Pokemon["id"];
  };
  config?: AxiosRequestConfig;
}

export const getEvolutionChain = ({
  params,
  config,
}: GetEvolutionChainParams) =>
  pokemonApi.get<EvolutionChain>(`evolution-chain/${params.id}`, {
    ...config,
  });
