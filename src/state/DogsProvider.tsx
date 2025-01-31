import { DogSearchSchema } from "@/components/DogSearchForm";
import { useDogsSearch } from "@/hooks/useDogsSearch";
import { z } from "zod";
import React, { useState } from "react";
import { IDog } from "@/types";

export interface IParams {
  breeds: string[] | undefined;
  zipCodes: string[] | undefined;
  ageMin: number | undefined;
  ageMax: number | undefined;
  size: number | undefined;
  sort: string | undefined;
  from: string | undefined;
}

export interface IDogsValues {
  dogs: IDog[] | undefined;
  allPages: IDog[][];
  onSubmit: (data: z.infer<typeof DogSearchSchema>) => Promise<void>;
  nextPage: () => void;
  prevPage: () => void;
  total: number;
}

export const DogsContext = React.createContext<IDogsValues>(null!);

interface IDogsProps {
  children: React.ReactNode;
}

export function DogsProvider({ children }: IDogsProps) {
  const [searchParams, setSearchParams] = useState<IParams>({
    breeds: undefined,
    zipCodes: undefined,
    ageMin: undefined,
    ageMax: undefined,
    size: undefined,
    sort: undefined,
    from: undefined, // Track where to start pagination
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    data: dogsData,
    // isLoading: _isDogsLoading,
    // isFetching: _isDogsFetching,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    // error: _dogsError,
    refetch,
  } = useDogsSearch(searchParams, {
    enabled: hasSubmitted, // Only fetch data after submission
  });

  async function onSubmit(data: z.infer<typeof DogSearchSchema>) {
    const params = {
      breeds: data.breeds?.length ? data.breeds : undefined,
      zipCodes: data.zipCodes ? data.zipCodes.split(",") : undefined,
      ageMin: data.ageMin ? Number(data.ageMin) : undefined,
      ageMax: data.ageMax ? Number(data.ageMax) : undefined,
      size: data.size ? Number(data.size) : undefined,
      sort: data.sort || undefined,
      from: undefined,
    };

    setSearchParams(params);
    setHasSubmitted(true);

    await refetch();
  }

  function nextPage() {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  function prevPage() {
    if (hasPreviousPage) {
      fetchPreviousPage();
    }
  }

  const value = {
    onSubmit,
    allPages: dogsData?.pages?.map((page) => page.dogs) || [],
    dogs: dogsData?.pages.flatMap((page) => page.dogs) || [], // Stores all fetched pages separately
    nextPage,
    prevPage,
    total: dogsData?.pages[0]?.total || 0,
  };

  return <DogsContext.Provider value={value}>{children}</DogsContext.Provider>;
}
