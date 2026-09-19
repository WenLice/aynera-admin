import { request } from "./client";
import type { Venue, VenueType } from "../types/api";

export type VenueNotification = {
  id: string;
  venueId: string;
  channel: "Email" | "Sms";
  visitOn: string;
  partySize: number;
  note: string | null;
  status: "Pending" | "Sent" | "Abandoned";
  attempts: number;
  createdAtUtc: string;
  sentAtUtc: string | null;
  abandonedAtUtc: string | null;
};

export function listVenueNotifications(id: string): Promise<VenueNotification[]> {
  return request<VenueNotification[]>(`/venues/${id}/notifications/GetAll`);
}

export function queueVenueHeadsUp(id: string, input: { visitOn: string; partySize: number; note: string | null }): Promise<VenueNotification[]> {
  return request<VenueNotification[]>(`/venues/${id}/notifications/Create`, { method: "POST", body: input });
}

export type VenueInput = {
  name: string;
  type: VenueType;
  cityId: string;
  area: string;
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhoneE164: string;
  photoUrls?: string[];
  capacity?: number | null;
  notes?: string | null;
  isActive?: boolean;
};

export function listVenues(): Promise<Venue[]> {
  return request<Venue[]>("/venues/GetAll");
}

export function createVenue(input: VenueInput): Promise<Venue> {
  return request<Venue>("/venues/Create", {
    method: "POST",
    body: input
  });
}

export function updateVenue(id: string, input: Partial<VenueInput>): Promise<Venue> {
  return request<Venue>(`/venues/${id}`, {
    method: "PATCH",
    body: input
  });
}

export function deleteVenue(id: string): Promise<null> {
  return request<null>(`/venues/${id}`, { method: "DELETE" });
}
