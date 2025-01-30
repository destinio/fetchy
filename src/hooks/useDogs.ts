import { DogsContext, IDogsValues } from "@/state/DogsProvider";
import { useContext } from "react";

export const useDogs = () => useContext<IDogsValues>(DogsContext);
