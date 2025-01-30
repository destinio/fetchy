import { ISearchOptions, searchDogs } from "@/api/dogs";
import { useQuery } from "@tanstack/react-query";

export function useDogsSearch(options: ISearchOptions) {
  return useQuery({
    queryKey: ["dogs", options],
    queryFn: () => searchDogs(options),
    staleTime: 1000 * 60 * 60,
  });
}
