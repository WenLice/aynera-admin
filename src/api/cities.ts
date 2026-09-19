import { request } from "./client";
import type { EarlyAccessCity } from "../types/api";

export function listCities(): Promise<EarlyAccessCity[]> {
  return request<EarlyAccessCity[]>("/early-access/cities/GetAll");
}

export function createCity(input: {
  name: string;
  wave: number;
  sortOrder: number;
  isActive: boolean;
}): Promise<EarlyAccessCity> {
  return request<EarlyAccessCity>("/early-access/cities/Create", {
    method: "POST",
    body: input
  });
}

export function updateCity(
  id: string,
  input: {
    name?: string;
    wave?: number;
    sortOrder?: number;
    isActive?: boolean;
  }
): Promise<EarlyAccessCity> {
  return request<EarlyAccessCity>(`/early-access/cities/${id}`, {
    method: "PATCH",
    body: input
  });
}

export function deleteCity(id: string): Promise<null> {
  return request<null>(`/early-access/cities/${id}`, { method: "DELETE" });
}
