import { BASE_URL } from "@/constants";

interface LoginParams {
  name: string;
  email: string;
}

/**
 * Logs in a user with the provided name and email.
 */
export async function login({ name, email }: LoginParams) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }
}

export async function logout() {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }
}
