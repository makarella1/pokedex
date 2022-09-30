import { useQuery } from "@tanstack/react-query";

import { getStat } from "../../requests";

interface UseGetStatQueryParams {
  id: number;
}

export const useGetStatQuery = ({ id }: UseGetStatQueryParams) =>
  useQuery(["stat", id], () => getStat({ params: { id } }));
