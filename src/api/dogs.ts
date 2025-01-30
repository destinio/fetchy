import { BASE_URL } from "@/constants";

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export async function getBreeds(): Promise<Dog[]> {
  const response = await fetch(`${BASE_URL}/dogs/breeds`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get breeds");
  }

  console.log(response);

  return [];
}
