import { BREEDS_URL, DOGS_URL, SEARCH_URL } from "@/constants";
import { IDog } from "@/types";

// Get Breeds
export async function getBreeds(): Promise<string[]> {
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
export async function getDogsInfo(dogIds: string[]): Promise<IDog[]> {
  const response = await fetch(DOGS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogIds),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get dogs info");
  }

  const data = await response.json();

  return data;
}

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

export async function searchDogs(options: ISearchOptions) {
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

  const foundDogs = (await response.json()) as ISearchResponse;

  const results = await getDogsInfo(foundDogs.resultIds);

  return { ...foundDogs, dogs: results };
}
