import { loginApi } from "@/api/userApi";
import React, { useState } from "react";

export interface IUser {
  name: string;
  email: string;
}

export interface IAppValues {
  user: IUser;
  login: (user: IUser) => Promise<void>;
}

export const AppContext = React.createContext<IAppValues>(null!);

interface IAppProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: IAppProps) {
  const [user, setUser] = useState<IUser>(null!);

  async function login({ name, email }: IUser) {
    const user = await loginApi({ name, email });

    if (user) {
      setUser({ name, email });
    }
  }
  const value = { login, user };

  return (
    <AppContext.Provider value={value}>
      <div>{children}</div>
    </AppContext.Provider>
  );
}
