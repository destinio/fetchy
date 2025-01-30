import { getBreeds } from "@/api/dogs";
import { useQuery } from "@tanstack/react-query";

export function useBreeds() {
  return useQuery({
    queryKey: ["breeds"],
    queryFn: getBreeds,
    staleTime: 1000 * 60 * 60,
  });
}
