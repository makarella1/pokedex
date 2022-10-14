import { useQuery } from "@tanstack/react-query";

import { getEvolutionChain } from "../requests";

interface UseGetEvolutionChainQueryParams {
  id: number;
}

export const useGetEvolutionChain = (
  params: RequestParams<UseGetEvolutionChainQueryParams>,
  settings?: RequestQuerySettings<typeof getEvolutionChain>
) =>
  useQuery(
    ["evolution-chain", params.id],
    () =>
      getEvolutionChain({
        params,
        ...(settings?.config && { config: settings.config }),
      }),
    {
      ...(settings?.options && settings.options),
    }
  );
