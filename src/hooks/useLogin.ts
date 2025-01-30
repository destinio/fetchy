import { BASE_URL } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export function useLogin() {
  return useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "admin",
          password: "admin",
        }),
      });
      const data = await response.json();
      return data;
    },
  });
}
