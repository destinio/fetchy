import { loginApi, logoutApi } from "@/api/userApi";
import { IUser } from "@/types";
import React, { useState } from "react";

export interface IAppValues {
  user: IUser;
  login: (user: IUser) => Promise<void>;
  logout: () => Promise<void>;
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
  async function logout() {
    await logoutApi();
    setUser(null!);
  }

  const value = { login, logout, user };

  return (
    <AppContext.Provider value={value}>
      <div>{children}</div>
    </AppContext.Provider>
  );
}
