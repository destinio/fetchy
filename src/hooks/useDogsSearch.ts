import { ISearchOptions, searchDogs } from "@/api/dogs";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useDogsSearch(
  options: ISearchOptions,
  { enabled }: { enabled: boolean },
) {
  return useInfiniteQuery({
    queryKey: ["dogs", options],
    queryFn: ({ pageParam }: { pageParam?: string | null }) => {
      return searchDogs({ ...options, from: pageParam ?? options.from });
    },
    staleTime: 1000 * 60 * 60,
    enabled,
    getNextPageParam: (lastPage) => {
      return lastPage?.next ? lastPage.next.split("from=")[1] : undefined; // Ensure it's a cursor, not URL
    },
    getPreviousPageParam: (lastPage) => {
      return lastPage?.prev ? lastPage.prev.split("from=")[1] : undefined; // Ensure it's a cursor, not URL
    },
    initialPageParam: null,
  });
}
