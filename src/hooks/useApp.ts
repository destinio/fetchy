import { IAppValues, AppContext } from "@/state/AppProvider";
import { useContext } from "react";

export const useApp = () => useContext<IAppValues>(AppContext);
