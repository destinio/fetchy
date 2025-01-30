import { DogSearchSchema } from "@/components/DogSearchForm";
import { useDogsSearch } from "@/hooks/useDogsSearch";
import { z } from "zod";
import React, { useState } from "react";
import { IDog } from "@/types";

export interface IDogsValues {
  dogs: IDog[] | undefined;
  onSubmit: (data: z.infer<typeof DogSearchSchema>) => Promise<void>;
}

export const DogsContext = React.createContext<IDogsValues>(null!);

interface IDogsProps {
  children: React.ReactNode;
}

export function DogsProvider({ children }: IDogsProps) {
  const [searchParams, setSearchParams] = useState({
    breeds: undefined,
    zipCodes: undefined,
    ageMin: undefined,
    ageMax: undefined,
    size: undefined,
    sort: undefined,
  });

  const [hasSubmitted, setHasSubmitted] = useState(false); // Track if the form has been submitted

  const {
    data: dogs,
    isLoading: isDogsLoading,
    isFetching: isDogsFetching,
    error: dogsError,
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
    };

    setSearchParams(params as any); // Update search params with the form data
    setHasSubmitted(true); // Mark the form as submitted
    await refetch(); // Trigger the query manually
  }

  const value = { onSubmit, dogs };

  return <DogsContext.Provider value={value}>{children}</DogsContext.Provider>;
}
