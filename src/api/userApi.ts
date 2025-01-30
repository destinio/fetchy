import { BASE_URL } from "@/constants";

interface LoginParams {
  name: string;
  email: string;
}

/**
 * Logs in a user with the provided name and email.
 */
export async function loginApi({ name, email }: LoginParams) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      email,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return true;
}

export async function logoutApi() {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }
}
