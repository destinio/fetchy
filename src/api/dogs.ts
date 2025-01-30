import { BASE_URL, BREEDS_URL, SEARCH_URL } from "@/constants";

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

// Get Breeds
export async function getBreeds(): Promise<Dog[]> {
  const response = await fetch(BREEDS_URL, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get breeds");
  }

  const data = await response.json();

  return data;
}

// Search Dogs

export interface ISearchOptions {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: string;
  sort?: string;
}

export interface ISearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export async function searchDogs(
  options: ISearchOptions,
): Promise<ISearchResponse> {
  const params = new URLSearchParams();

  if (options.breeds) params.append("breeds", options.breeds.join(","));
  if (options.zipCodes) params.append("zipCodes", options.zipCodes.join(","));
  if (options.ageMin !== undefined)
    params.append("ageMin", options.ageMin.toString());
  if (options.ageMax !== undefined)
    params.append("ageMax", options.ageMax.toString());
  if (options.size !== undefined)
    params.append("size", options.size.toString());
  if (options.from) params.append("from", options.from);
  if (options.sort) params.append("sort", options.sort);

  const response = await fetch(`${SEARCH_URL}?${params.toString()}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to search dogs");
  }

  return response.json();
}
