import { IDog } from "@/types";
import React, { useState } from "react";

export interface IDogsValues {
  searchDogs: IDog[];
  submitDogs: (dogsIds: string[]) => void;
}

export const DogsContext = React.createContext<IDogsValues>(null!);

interface IDogsProps {
  children: React.ReactNode;
}

export function DogsProvider({ children }: IDogsProps) {
  const [searchDogs, setSearchDogs] = useState<IDog[]>(null!);

  function submitDogs(dogsIds: string[]) {
    setSearchDogs(dogsIds);
  }

  const value = { searchDogs, submitDogs };

  return <DogsContext.Provider value={value}>{children}</DogsContext.Provider>;
}
